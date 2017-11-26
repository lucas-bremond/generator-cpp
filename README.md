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

## Usage

To create a new project:

```bash
yo cpp # Interactive
yo cpp --name "MyProject" --author "Bob Marley" --email "bob@marley.com" # Manual
yo cpp --auto # Automatic (default values)
```

To create a new class:

```bash
yo cpp:class # Interactive
yo cpp:class MyClass # Manual
yo cpp:class --auto # Automatic (default values)
```

To display help:

```bash
yo cpp --help
```

## Credits

Big thanks to:

- [generator-cpp-suite](https://github.com/gpichot/generator-cpp-suite)
- [Yet Another Cpp Template Generator](https://github.com/merlinvn/generator-yact)
- [CONTRIBUTING](https://gist.github.com/PurpleBooth/b24679402957c63ec426)
