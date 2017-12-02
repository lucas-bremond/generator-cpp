# C++ Project Generator

A [Yeoman](http://yeoman.io/) generator for C++ projects.

[![Build Status](https://travis-ci.org/lucas-bremond/generator-cpp.svg?branch=master)](https://travis-ci.org/lucas-bremond/generator-cpp)
[![Code Coverage](https://codecov.io/gh/lucas-bremond/generator-cpp/branch/master/graph/badge.svg)](https://codecov.io/gh/lucas-bremond/generator-cpp)
[![License](https://img.shields.io/packagist/l/doctrine/orm.svg)](LICENSE.md)

| Feature           | Dependency  | Version |
|-------------------|-------------|---------|
| Source Control    | Git         | 2.13.3  |
| Build & Packaging | CMake       | 2.8.12  |
| Unit Testing      | GoogleTest  | 1.8.0   |
| Code Coverage     | Lcov / Gcov | 1.13    |
| Documentation     | Doxygen     | 1.8.13  |

## Dependencies

The following tools are required:

### npm

[https://www.npmjs.com/](https://www.npmjs.com/)

### Yeoman

```bash
npm install -g yo
```

## Install

To install the generator:

```bash
npm install generator-cpp
```

## Setup

### Project

To interactively setup a project:

```bash
yo cpp
```

To manually setup a project:

```bash
yo cpp --name "C++ Project" --author "Bob Marley" --email "bob@marley.com"
```

To automatically setup a project:

```bash
yo cpp --auto
```

### Class

To interactively add a class:

```bash
yo cpp:class
```

To manually add a class:

```bash
yo cpp:class MyClass
```

To automatically add a class:

```bash
yo cpp:class --auto
```

### Other

To display help:

```bash
yo cpp --help
```

## Build

Both `CMake` (recommended) and `Autoconf` syntaxes are supported:

```bash
mkdir build && cd build
cmake ..
make
```

or...

```bash
./configure
make
```

To run the tests:

```bash
make test
```

To run the code coverage analysis:

```bash
make coverage
```

To generate the documentation:

```bash
make docs
```

To install / uninstall:

```bash
make install
make uninstall
```

## Credits

Big thanks to:

- [generator-cpp-suite](https://github.com/gpichot/generator-cpp-suite)
- [Yet Another Cpp Template Generator](https://github.com/merlinvn/generator-yact)
- [CONTRIBUTING](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
- [CodeCoverage.cmake](https://github.com/bilke/cmake-modules/blob/master/CodeCoverage.cmake)
- [GetGitRevisionDescription.cmake](https://github.com/rpavlik/cmake-modules/blob/master/GetGitRevisionDescription.cmake)
- [UninstallTarget.cmake](https://github.com/benekastah/cpp-project-template/blob/master/tools/share/cmake/DocumentationTargets.cmake)
- [doxygen-bootstrapped](https://github.com/Velron/doxygen-bootstrapped)