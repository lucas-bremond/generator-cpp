########################################################################################################################################################
###
### Copyright (C) <%= year %> by <%= companyName %>
###
### This file is part of the <%= projectName %> project.
###
########################################################################################################################################################

### @file                       <%= projectPath %>/CppUtility/CMakeLists.txt
### @author                     <%= authorName %> <<%= authorEmail %>>
### @date                       <%= date %>

########################################################################################################################################################

## Project Properties

SET (PROJECT_NAME "<%= projectName %>")
SET (PROJECT_DESCRIPTION "<%= projectDescription %>")
SET (PROJECT_PATH "<%= projectPath %>")
SET (PROJECT_PACKAGE_NAME "<%= projectPackage %>")
SET (PROJECT_LICENSE "<%= projectLicense %>")
SET (PROJECT_VENDOR_ID "<%= companyId %>")
SET (PROJECT_VENDOR_NAME "<%= companyName %>")
SET (PROJECT_VENDOR_CONTACT "<%= authorEmail %>")
SET (PROJECT_VENDOR_URL "<%= companyWebsite %>")

########################################################################################################################################################

## Setup

### Compatibility Check

CMAKE_MINIMUM_REQUIRED (VERSION "2.8.12" FATAL_ERROR)

### Paths

SET (CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/tools/cmake")

### Policies

CMAKE_POLICY (SET "CMP0048" NEW)

########################################################################################################################################################

## Project Configuration

PROJECT (${PROJECT_NAME} VERSION ${PROJECT_VERSION_STRING} LANGUAGES "C" "CXX")

########################################################################################################################################################

## Targets

SET (EXECUTABLE_NAME "${PROJECT_PACKAGE_NAME}.exe")
SET (EXECUTABLE_TARGET ${EXECUTABLE_NAME})

FILE (GLOB_RECURSE EXE_HEADERS "${PROJECT_SOURCE_DIR}/include/*.hpp")
FILE (GLOB_RECURSE EXE_SRCS "${PROJECT_SOURCE_DIR}/src/*.cpp" "${PROJECT_SOURCE_DIR}/src/*.cxx")

ADD_EXECUTABLE (${EXECUTABLE_TARGET} ${EXE_SRCS})

ADD_DEPENDENCIES (${EXECUTABLE_TARGET} ${SHARED_LIBRARY_TARGET})

TARGET_INCLUDE_DIRECTORIES (${EXECUTABLE_TARGET} PUBLIC "${CMAKE_SOURCE_DIR}/include")
TARGET_INCLUDE_DIRECTORIES (${EXECUTABLE_TARGET} PUBLIC "${PROJECT_SOURCE_DIR}/include")

TARGET_LINK_LIBRARIES (${EXECUTABLE_TARGET} "pthread")
TARGET_LINK_LIBRARIES (${EXECUTABLE_TARGET} ${SHARED_LIBRARY_TARGET})

SET_TARGET_PROPERTIES (${EXECUTABLE_TARGET} PROPERTIES VERSION ${PROJECT_VERSION_STRING} OUTPUT_NAME ${EXECUTABLE_NAME} CLEAN_DIRECT_OUTPUT 1)

INSTALL (TARGETS ${EXECUTABLE_TARGET} DESTINATION ${INSTALL_BIN} COMPONENT "applications")

########################################################################################################################################################