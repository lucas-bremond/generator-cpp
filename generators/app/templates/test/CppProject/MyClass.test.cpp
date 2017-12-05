////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Copyright (C) <%= year %> by <%= companyName %>
///
/// This file is part of the <%= projectName %> project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// @file                       <%= projectPath %>/MyClass.test.cpp
/// @author                     <%= authorName %> <<%= authorEmail %>>
/// @date                       <%= date %>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <Global.test.hpp>

#include <<%= projectPath %>/MyClass.hpp>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, DefaultConstructor)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    EXPECT_NO_THROW(MyClass()) ;

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, Constructor)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    EXPECT_NO_THROW(MyClass(MyClass::MyEnum::First, 123, "Hello World!")) ;

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, EqualToOperator)
{
    
    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    EXPECT_TRUE(MyClass() == MyClass()) ;
    EXPECT_TRUE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 123, "Hello World!")) ;

    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::Second, 123, "Hello World!")) ;
    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 456, "Hello World!")) ;
    EXPECT_FALSE(MyClass(MyClass::MyEnum::First, 123, "Hello World!") == MyClass(MyClass::MyEnum::First, 123, "Hello You!")) ;

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, StreamOperator)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    {

        std::stringstream        stringStream ;

        MyClass myClass ;

        stringStream << myClass ;

        EXPECT_EQ("Greetings!\n", stringStream.str()) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, IsDefined)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    {

        MyClass myClass ;

        EXPECT_FALSE(myClass.isDefined()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_TRUE(myClass.isDefined()) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, GetInteger)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    {

        MyClass myClass ;

        EXPECT_EQ(0, myClass.getInteger()) ;

    }

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_EQ(123, myClass.getInteger()) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, SetInteger)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

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

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, DoSomething)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

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

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, PrintSomething)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    {
        
        MyClass myClass ;

        EXPECT_NO_THROW(myClass.printSomething()) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_MyClass, Integer)
{
    
    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::MyClass ;

    {

        MyClass myClass = MyClass::Integer(123) ;

        EXPECT_EQ(123, myClass.getInteger()) ;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////