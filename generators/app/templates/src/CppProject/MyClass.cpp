////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///	Copyright (C) 2017 by Company Inc.
///
///	This file is part of the C++ Project project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///	@file						CppProject/MyClass.cpp
///	@author						Bob Marley <bob@marley.com>
///	@date						1 Dec 2017

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <iostream>

#include <CppProject/MyClass.hpp>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

namespace cppproject
{

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                                MyClass::MyClass							( )
                                :	enum_(MyClass::MyEnum::First),
                                    integer_(0),
                                    string_("")
{

}

                                MyClass::MyClass							(	const	MyClass::MyEnum&			anEnum,
                                                                                const	int&						anInteger,
                                                                                const	std::string&				aString								)
                                :	enum_(anEnum),
                                    integer_(anInteger),
                                    string_(aString)
{

}

bool							MyClass::operator ==						(	const	MyClass&					aMyClass							) const
{
    return (enum_ == aMyClass.enum_) && (integer_ == aMyClass.integer_) && (string_ == aMyClass.string_) ;
}

std::ostream&					operator <<									(			std::ostream&				anOutputStream,
                                                                                const	MyClass&					aMyClass							)
{

    anOutputStream << "Greetings!" << std::endl ;

    return anOutputStream ;

}

bool							MyClass::isDefined							( ) const
{
    return integer_ > 0 ;
}

int								MyClass::getInteger							( ) const
{
    return integer_ ;
}

void							MyClass::setInteger							(	const	int&						anInteger							)
{
    integer_ = anInteger ;
}

void							MyClass::doSomething						( )
{
    this->doSomethingPrivate() ;
}

void							MyClass::printSomething						( )
{
    std::cout << "Hello World!" << std::endl ;
}

MyClass							MyClass::Integer							(	const	int&						anInteger							)
{

    MyClass myClass ;

    myClass.integer_ = anInteger ;

    return myClass ;

}

void							MyClass::doSomethingPrivate					( )
{
    integer_ = integer_ * 2 ;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////