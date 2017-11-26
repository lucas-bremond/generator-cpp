# C++ Project Generator

A [Yeoman](http://yeoman.io/) generator for C++ projects.

| Feature           | Dependency  | Version |
|-------------------|-------------|---------|
| Source Control    | Git         | 2.13.3  |
| Build & Packaging | CMake       | 2.8.12  |
| Unit Testing      | GoogleTest  | 1.8.0   |
| Code Coverage     | Lcov / Gcov | -       |
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

To create a project interactively:

```bash
yo cpp
```

To create a project manually:

```bash
yo cpp --name "MyProject" --author "Bob Marley" --email "bob@marley.com"
```

To create a project automatically:

```bash
yo cpp --auto
```

### Class

To create a class interactively:

```bash
yo cpp:class
```

To create a class manually:

```bash
yo cpp:class MyClass
```

To create a class automatically:

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

## Test

To run all tests:

```bash
./bin/cpp-project.test
```

## Credits

Big thanks to:

- [generator-cpp-suite](https://github.com/gpichot/generator-cpp-suite)
- [Yet Another Cpp Template Generator](https://github.com/merlinvn/generator-yact)
- [CONTRIBUTING](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
