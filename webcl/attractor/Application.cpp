// Copyright (c) 2013 Andrey Tuganov
//
// The zlib/libpng license
//
// This software is provided 'as-is', without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
//
// 2. Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
//
// 3. This notice may not be removed or altered from any source distribution.

#include "gltools.h"

#include <iostream>
#include <string>

#include "Application.h"
#include "LorenzAttractorDemo.h"
#include "Solver.h"
#include "Demo.h"

#define USE_GLUT

//#define USE_GLFW

#ifdef __EMSCRIPTEN__
    #include <emscripten/emscripten.h>
    #include <GL/gl.h>
    #ifdef USE_GLUT
        #include <GL/glut.h>
    #elif defined(USE_GLFW)
        #include <GL/glfw.h>
    #endif
    #include <CL/opencl.h>
#else
    #include <OpenGL/OpenGL.h>
    #include <OpenGL/gl.h>
    #include <OpenGL/CGLDevice.h>
    #include <GLUT/glut.h>
    #include <OpenCL/opencl.h>
#endif

#ifdef __APPLE__
    #include <mach/mach_time.h>
#endif

#define SEPARATOR                       ("----------------------------------------------------------------------\n")

#include "global.h"
#include "error.h"

static double TimeElapsed                       = 0;
static int FrameCount                           = 0;
static unsigned int ReportStatsInterval         = 15;
static char StatsString[512]                    = "\0";

// static int framesLastSecond = 0;
// static int lastSecond = 0;
// static int curFrame = 0;

static Application *instance = NULL;

#ifdef __EMSCRIPTEN__

void print_stack() {
    printf("\n%s",SEPARATOR);
    cl_uint size = 0;
    webclPrintStackTrace(NULL,&size);

    char* webcl_stack = (char*)malloc(size+1);
    webcl_stack[size] = '\0';
    
    webclPrintStackTrace(webcl_stack,&size);
    printf("%s\n",webcl_stack);

    printf("%s",SEPARATOR);
    free(webcl_stack);
}
#endif

int end(int e) {
    #ifdef __EMSCRIPTEN__
        print_stack();
    #endif
    return e;
}

void Shutdown(void)
{
    printf(SEPARATOR);
    printf("Shuting down...\n");

    Solver::get()->cleanup();

    end(0);
    exit(0);
}

void Keyboard( unsigned char key, int x, int y )
{
#ifdef USE_GLUT    
   switch( key )
   {
    case 27:
    case 'q':
#ifdef __EMSCRIPTEN__
         webclEndProfile();
#endif
         Shutdown();
         break;
    case 'i':
        if (Application::get())
            Application::get()->zoomIn();
        break;         
    case 'o':
        if (Application::get())
            Application::get()->zoomOut();
        break;                 
    }
    glutPostRedisplay();
#endif    
}

void Display(void)
{
  if (Application::get())
      Application::get()->run();
}

void Idle(void)
{
#ifdef USE_GLUT    
    glutPostRedisplay();
#endif    
}

#ifdef __EMSCRIPTEN__
static float GetCurrentTime()
{
    return emscripten_get_now();
}

static float SubtractTime( float uiEndTime, float uiStartTime )
{
    return 0.001f * (uiEndTime - uiStartTime);
}

#else

static uint64_t GetCurrentTime()
{
    return mach_absolute_time();
}

static double SubtractTime( uint64_t uiEndTime, uint64_t uiStartTime )
{
    static double s_dConversion = 0.0;
    uint64_t uiDifference = uiEndTime - uiStartTime;
    if( 0.0 == s_dConversion )
    {
        mach_timebase_info_data_t kTimebase;
        kern_return_t kError = mach_timebase_info( &kTimebase );
        if( kError == 0  )
            s_dConversion = 1e-9 * (double) kTimebase.numer / (double) kTimebase.denom;
    }
        
    return s_dConversion * (double) uiDifference; 
}
#endif

#ifdef __EMSCRIPTEN__
static void ReportStats(float uiStartTime, float uiEndTime)
{
#else
static void ReportStats(uint64_t uiStartTime, uint64_t uiEndTime)
{   
#endif
    TimeElapsed += SubtractTime(uiEndTime, uiStartTime);

    if(TimeElapsed && FrameCount && FrameCount > ReportStatsInterval) 
    {
        double fMs = (TimeElapsed * 1000.0 / (double) FrameCount);
        double fFps = 1.0 / (fMs / 1000.0);

#ifdef __EMSCRIPTEN__
        printf("[%s] Particles: %d  Compute: %3.2f ms  Display: %3.2f fps (%s)\n",
                (global::par().getInt("gpuDevice")) ? "GPU" : "CPU", global::par().getInt("nParticles"),
                fMs, fFps, global::par().isEnabled("CL_GL_interop") ? "attached" : "copying");
#else
#ifdef USE_GLUT        
        sprintf(StatsString, "[%s]Particles: %d  Compute: %3.2f ms  Display: %3.2f fps (%s)\n", 
                (global::par().getInt("gpuDevice")) ? "GPU" : "CPU", global::par().getInt("nParticles"),
                fMs, fFps, global::par().isEnabled("CL_GL_interop") ? "attached" : "copying");
        glutSetWindowTitle(StatsString);
#endif        
#endif

        FrameCount = 0;
        TimeElapsed = 0;
    }    
}

Application *Application::get()
{
    if(!instance)
    {
#ifdef __EMSCRIPTEN__
         webclBeginProfile("Profile Attractor webcl");
#endif        
        instance = new Application();
        instance->init();
    }

    return instance;
}

Application::Application()
{
    m_simTime = 0.f;
    m_simDeltaTime = 0.f;
    m_cursorX = 0.f;
    m_cursorY = 0.f;
    m_eyeDist = 100.f;
}

Application::~Application()
{

}

void Application::init()
{
  
    int windowWidth = global::par().getInt("windowWidth");
    int windowHeight = global::par().getInt("windowHeight");
    std::string windowTitle = global::par().getString("windowTitle");
    
#ifdef USE_GLUT    
    int argc = 0;
    glutInit(&argc, NULL);
    
    glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA | GLUT_DEPTH);
    glutInitWindowSize (windowWidth, windowHeight);
    glutInitWindowPosition (0, 0);
    glutCreateWindow (windowTitle.c_str());
    
    glutDisplayFunc(Display);
    glutIdleFunc(Idle);
    glutKeyboardFunc(Keyboard);
#elif defined(USE_GLFW)
    if( !glfwInit() )
        error::throw_ex("unable to initialize GLFW",__FILE__,__LINE__);
    glfwOpenWindow(windowWidth, windowHeight, 8, 8, 8, 8, 0, 0, GLFW_WINDOW);
    glfwSetWindowTitle(windowTitle.c_str());
#endif

    setupLorenzAttractor();
            
    atexit(Shutdown);

#ifdef USE_GLUT
    glutMainLoop(); 

#elif defined(USE_GLFW)
    glViewport(0, 0, windowWidth, windowHeight);

    emscripten_set_main_loop(Display, 0, true);   
#endif    
}


void Application::run()
{

    // float realTime = getRealTime();
    // ++framesLastSecond;
    // if ( lastSecond != (int)realTime )
    // {
    //     lastSecond = (int)realTime;
    //     std::cout << "FPS: " << framesLastSecond << std::endl;
    //     framesLastSecond = 0;
    // }

    FrameCount++;
    #ifdef __EMSCRIPTEN__
    float uiStartTime = GetCurrentTime();
    #else
    uint64_t uiStartTime = GetCurrentTime();
    #endif
    
    // render and swap buffers
    Demo::get()->render(m_simTime,m_eyeDist);

    // swap buffer
#ifdef USE_GLUT    
    glutSwapBuffers();
#elif defined(USE_GLFW)
    glfwSwapBuffers();
#endif    

    // step simulation
    Solver::get()->step(m_simTime,m_simDeltaTime);

    // exchanges information between solver and renderer if not already shared
    Demo::get()->update();

    m_simTime += m_simDeltaTime;

    #ifdef __EMSCRIPTEN__
    float uiEndTime = GetCurrentTime();
    #else
    uint64_t uiEndTime = GetCurrentTime();
    #endif

    ReportStats(uiStartTime, uiEndTime);

    // ++curFrame;
}

void Application::zoomOut() {
    m_eyeDist += 5.0f;
    if (m_eyeDist > 350.f) m_eyeDist = 350.f;
    //printf("m_eyeDist : %f\n",m_eyeDist);
}

void Application::zoomIn() {
    m_eyeDist -= 5.0f;
    if (m_eyeDist < 50.f) m_eyeDist = 50.f;
    //printf("m_eyeDist : %f\n",m_eyeDist);    
}

float Application::getRealTime()
{
#ifdef USE_GLFW
    return glfwGetTime();
#else
    return 0.0f;
#endif    
}

float Application::getSimTime()
{
    return m_simTime;
}

void Application::setupLorenzAttractor()
{
    m_simTime = 0.f;
    m_simDeltaTime = 1.f/60.f;

    int nX = 128;//128;//64;//128;//256;
    int nY = 128;//128;//64;//128;//256;
    int nZ = 64;//128;//64;//128;//256;
    int nParticles = nX*nY*nZ;

    global::par().setInt("nParticles",nParticles);

    #ifdef __EMSCRIPTEN__
        global::par().setString("vertexShaderFilename","shader/lorenz.vert");
        global::par().setString("fragmentShaderFilename","shader/lorenz.frag");
    #else
        global::par().setString("vertexShaderFilename","shader/lorenz_osx.vert");
        global::par().setString("fragmentShaderFilename","shader/lorenz_osx.frag");
    #endif

    global::par().setString("kernelFilename","kernel/lorenz.cl");

    void *onePiece = NULL;

    onePiece = (float*) malloc(9*nParticles*sizeof(float)); // float4 pos, float4 color, float lifetime
    if ( onePiece == NULL )
        error::throw_ex("memory allocation failed",__FILE__,__LINE__);
    // TODO write a reasonable memory manager, for now just keep the memory allocated till the end of the application

    float *pos = (float *)onePiece;
    float *color = pos + 4*nParticles;
    float *lifetime = pos + 8*nParticles;

    memset(color,0,4*nParticles*sizeof(float));

#if 0
    auto initState = [](float *pos, float x, float y, float z, float spread)
    {
        pos[0] = x+spread*(2.f*float(rand())/RAND_MAX-1.f);
        pos[1] = x+spread*(2.f*float(rand())/RAND_MAX-1.f);
        pos[2] = x+spread*(2.f*float(rand())/RAND_MAX-1.f);
        pos[3] = 1.f;
    };

    for( int i = 0; i < nParticles; ++i )
    {
        /*
        if ( i < nParticles*0.1 )
            initState(&pos[4*i],-10.f,0.f,30.f,20.f);
        else if ( i < nParticles*0.2 )
            initState(&pos[4*i],10.f,10.f,10.f,20.f);
        else if ( i < nParticles*0.3 )
            initState(&pos[4*i],-10.f,-10.f,100.f,20.f);
        else*/
        initState(pos+4*i,0.f,0.f,0.f,100.f);
    }
#endif

    {
        float side = 100.f;
        for( int i = 0; i < nX; ++i )
        {
            for( int j = 0; j < nY; ++j )
            {
                for( int k = 0; k < nZ; ++k )
                {
                    int idx = (i*nY+j)*nZ+k;
                    lifetime[idx] = 6.f+32.f*float(rand())/RAND_MAX;
                    idx *= 4;
                    pos[idx+0] = side*float(2*i-nX)/float(nX);
                    pos[idx+1] = side*float(2*j-nY)/float(nY);
                    pos[idx+2] = side*float(2*k-nZ)/float(nZ);
                    pos[idx+3] = 1.f;
                }
            }
        }
    }

    global::par().setPtr("pos",(void*)pos);
    global::par().setPtr("color",(void*)color);
    global::par().setPtr("lifetime",(void*)lifetime);

    Demo::create(Demo::LorenzAttractor);
    Solver::create(Solver::LorenzAttractorOpenCL);  
}
