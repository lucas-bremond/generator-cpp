////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
///	Copyright (C) 2017 by Company Inc.
///
///	This file is part of the C++ Project project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///	@file						CppProject/MyClass.test.cpp
///	@author						Bob Marley <bob@marley.com>
///	@date						1 Dec 2017

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <Global.test.hpp>

#include <CppProject/MyClass.hpp>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TEST(CppProject_MyClass, DefaultConstructor)
{

    using cppproject::MyClass ;

    EXPECT_NO_THROW(MyClass()) ;

}

TEST(CppProject_MyClass, Constructor)
{

    using cppproject::MyClass ;

    EXPECT_NO_THROW(MyClass(MyClass::MyEnum::First, 123, "Hello World!")) ;

}

TEST(CppProject_MyClass, EqualToOperator)
{
    
    using cppproject::MyClass ;

    EXPECT_TRUE(MyClass() == MyClass()) ;
    EXPECT_TRUE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 123, "Hello World!")) ;

    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::Second, 123, "Hello World!")) ;
    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 456, "Hello World!")) ;
    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 123, "Hello You!")) ;

}

TEST(CppProject_MyClass, StreamOperator)
{

    using cppproject::MyClass ;

    {

        std::stringstream		stringStream ;

        MyClass myClass ;

        stringStream << myClass ;

        EXPECT_EQ("Greetings!\n", stringStream.str()) ;

    }

}

TEST(CppProject_MyClass, IsDefined)
{

    using cppproject::MyClass ;

    {

        MyClass myClass ;

        EXPECT_FALSE(myClass.isDefined()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_TRUE(myClass.isDefined()) ;

    }

}

TEST(CppProject_MyClass, GetInteger)
{

    using cppproject::MyClass ;

    {

        MyClass myClass ;

        EXPECT_EQ(0, myClass.getInteger()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_EQ(123, myClass.getInteger()) ;

    }

}

TEST(CppProject_MyClass, SetInteger)
{

    using cppproject::MyClass ;

    {

        MyClass myClass ;

        EXPECT_EQ(0, myClass.getInteger()) ;

        myClass.setInteger(123) ;
        
        EXPECT_EQ(123, myClass.getInteger()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_EQ(123, myClass.getInteger()) ;

        myClass.setInteger(456) ;
        
        EXPECT_EQ(456, myClass.getInteger()) ;

    }

}

TEST(CppProject_MyClass, DoSomething)
{

    using cppproject::MyClass ;

    {

        MyClass myClass ;

        myClass.doSomething() ;

        EXPECT_EQ(0, myClass.getInteger()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        myClass.doSomething() ;

        EXPECT_EQ(246, myClass.getInteger()) ;

    }

}

TEST(CppProject_MyClass, PrintSomething)
{

    using cppproject::MyClass ;

    {
        
        MyClass myClass ;

        EXPECT_NO_THROW(myClass.printSomething()) ;

    }

}

TEST(CppProject_MyClass, Integer)
{
    
    using cppproject::MyClass ;

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_EQ(123, myClass.getInteger()) ;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////