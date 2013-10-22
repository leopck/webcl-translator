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

#include "error.h"
#include <stdexcept>
#include <sstream>

namespace error
{

void throw_ex( const char *msg, const char *file, const int line )
{
	
	printf("%s in %s, line %d\n",msg,file,line);
	
	#ifdef __EMSCRIPTEN__
		exit(1);
	#endif

    std::stringstream ss;

    ss << msg << " in " << file << ", line " << line << std::endl;
    throw std::runtime_error( ss.str());
}

void throw_ex( const char *msg )
{

	printf("%s\n",msg);

	#ifdef __EMSCRIPTEN__
		exit(1);
	#endif

    throw std::runtime_error( msg );
}

}