////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///
/// Copyright (C) <%= year %> by <%= companyName %>
///
/// This file is part of the <%= projectName %> project.
///
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// @file                       <%= projectPath %>/<%= folder %><%= className %>.test.cpp
/// @author                     <%= authorName %> <<%= authorEmail %>>
/// @date                       <%= date %>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#include <Global.test.hpp>

#include <<%= projectPath %>/<%= folder %><%= className %>.hpp>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

TEST(<%= projectPath.replace(/\//g, '_') %>_<%= folder.replace(/\//g, '_') %><%= className %>, Constructor)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::<%= className %> ;

    {

        EXPECT_NO_THROW(<%= className %>()) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_<%= folder.replace(/\//g, '_') %><%= className %>, CopyConstructor)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::<%= className %> ;

    {

        <%= className %> original ;

        EXPECT_NO_THROW(<%= className %> copy(original)) ;

    }

}

TEST(<%= projectPath.replace(/\//g, '_') %>_<%= folder.replace(/\//g, '_') %><%= className %>, AssignmentOperator)
{

    using <%= projectPath.toLowerCase().replace(/\//g, '_') %>::<%= className %> ;

    {

        <%= className %> original ;

        <%= className %> copy ;

        EXPECT_NO_THROW(copy = original) ;

    }

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////