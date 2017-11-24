const Generator = require('yeoman-generator') ;
const moment = require('moment') ;

module.exports = class extends Generator
{

  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;

    // this.option('babel') ;
  
  }

  // Run loop

  initializing ()
  {
    
    let currentDate = moment() ;

    this.year = currentDate.format("YYYY") ;
    this.date = currentDate.format("D MMM YYYY") ;

  }

  prompting ()
  {
    
    return this.prompt
    (
      [
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: 'C++ Project'
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Project description:',
          default: 'A pretty cool C++ project.'
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Project path:',
          default: 'CppProject'
        },
        {
          type: 'input',
          name: 'projectPackage',
          message: 'Project package name:',
          default: 'cpp-project'
        },
        {
          type: 'input',
          name: 'projectLicense',
          message: 'Project license:',
          default: 'MIT License'
        },
        {
          type: 'input',
          name: 'authorName',
          message: 'Author name:',
          default: 'Bob Marley'
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Author e-mail:',
          default: 'bob@marley.com'
        },
        {
          type: 'input',
          name: 'companyName',
          message: 'Company name:',
          default: 'Company Inc.'
        },
        {
          type: 'input',
          name: 'companyId',
          message: 'Company ID:',
          default: 'com.company'
        },
        {
          type: 'input',
          name: 'companyWebsite',
          message: 'Company website:',
          default: 'www.company.com'
        },
        {
          type: 'confirm',
          name: 'buildSharedLib',
          message: 'Would you like to build a shared library?',
          default: true
        },
        {
          type: 'confirm',
          name: 'buildStaticLib',
          message: 'Would you like to build a static library?',
          default: false
        },
        {
          type: 'confirm',
          name: 'buildUtility',
          message: 'Would you like to build a utility?',
          default: true
        },
        {
          type: 'confirm',
          name: 'buildTest',
          message: 'Would you like to build the unit tests?',
          default: true
        },
        {
          type: 'confirm',
          name: 'buildDocumentation',
          message: 'Would you like to build the documentation?',
          default: true
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        this.answers = answers ;
      }
    ) ;

  }

  configuring ()
  {
    
  }
  
  default ()
  {
    
  }
  
  writing ()
  {
    
    this._setupGit() ;
    this._setupBuild() ;
    this._setupSrc() ;

    if (this.answers['buildUtility'])
    {
      this._setupUtility() ;
    }

    if (this.answers['buildTest'])
    {
      this._setupTest() ;
    }

    if (this.answers['buildDocumentation'])
    {
      this._setupDocumentation() ;
    }

  }
  
  conflicts ()
  {
    
  }
  
  install ()
  {
    
  }
  
  end ()
  {
    this.config.set(this.answers) ;
  }

  // Private methods
  
  _setupGit ()
  {
    
    this.fs.copyTpl
    (
      this.templatePath('_gitignore'),
      this.destinationPath('.gitignore'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.spawnCommand('git', ['init']) ;
    
  }
  
  _setupBuild ()
  {

    this.fs.copyTpl
    (
      this.templatePath('configure'),
      this.destinationPath('configure'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectDescription: this.answers['projectDescription'],
        projectPath: this.answers['projectPath'],
        projectPackage: this.answers['projectPackage'],
        projectLicense: this.answers['projectLicense'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName'],
        companyId: this.answers['companyId'],
        companyWebsite: this.answers['companyWebsite'],
        buildSharedLib: this.answers['buildSharedLib'],
        buildStaticLib: this.answers['buildStaticLib'],
        buildUtility: this.answers['buildUtility'],
        buildTest: this.answers['buildTest'],
        buildDocumentation: this.answers['buildDocumentation']
      }
    ) ;
    
    this.fs.copyTpl
    (
      this.templatePath('Makefile'),
      this.destinationPath('Makefile'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('CONTRIBUTING.md'),
      this.destinationPath('CONTRIBUTING.md')
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.answers['projectName'],
        projectDescription: this.answers['projectDescription']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfig.cmake.in'),
      this.destinationPath('tools/cmake/' + this.answers['projectPath'] + 'Config.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        projectPackage: this.answers['projectPackage'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfigVersion.cmake.in'),
      this.destinationPath('tools/cmake/' + this.answers['projectPath'] + 'ConfigVersion.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/cmake/DocumentationTargets.cmake'),
      this.destinationPath('tools/cmake/DocumentationTargets.cmake')
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/cmake/FindGTest.cmake'),
      this.destinationPath('tools/cmake/FindGTest.cmake')
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/cmake/GetGitRevisionDescription.cmake'),
      this.destinationPath('tools/cmake/GetGitRevisionDescription.cmake')
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/cmake/GetGitRevisionDescription.cmake.in'),
      this.destinationPath('tools/cmake/GetGitRevisionDescription.cmake.in')
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/UninstallTarget.cmake.in'),
      this.destinationPath('tools/cmake/UninstallTarget.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/doxygen'),
      this.destinationPath('tools/doxygen')
    ) ;

  }

  _setupSrc ()
  {
    
    this.fs.write
    (
      this.destinationPath('bin/.gitkeep'),
      ''
    ) ;

    this.fs.write
    (
      this.destinationPath('lib/.gitkeep'),
      ''
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('include/CppProject/MyClass.hpp'),
      this.destinationPath('include/' + this.answers['projectPath'] + '/MyClass.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('src/CppProject/MyClass.cpp'),
      this.destinationPath('src/' + this.answers['projectPath'] + '/MyClass.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

  }

  _setupUtility ()
  {

    this.fs.copyTpl
    (
      this.templatePath('share/CppUtility/src/CppUtility.cxx'),
      this.destinationPath('share/CppUtility/src/CppUtility.cxx'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('share/CppUtility/CMakeLists.txt'),
      this.destinationPath('share/CppUtility/CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectDescription: this.answers['projectDescription'],
        projectPath: this.answers['projectPath'],
        projectPackage: this.answers['projectPackage'],
        projectLicense: this.answers['projectLicense'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName'],
        companyId: this.answers['companyId'],
        companyWebsite: this.answers['companyWebsite'],
        buildSharedLib: this.answers['buildSharedLib'],
        buildStaticLib: this.answers['buildStaticLib'],
        buildUtility: this.answers['buildUtility'],
        buildTest: this.answers['buildTest'],
        buildDocumentation: this.answers['buildDocumentation']
      }
    ) ;

  }

  _setupTest ()
  {

    this.fs.copyTpl
    (
      this.templatePath('test/Global.test.hpp'),
      this.destinationPath('test/Global.test.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Main.test.cxx'),
      this.destinationPath('test/Main.test.cxx'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Setup.test.hpp'),
      this.destinationPath('test/Setup.test.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/CppProject/MyClass.test.cpp'),
      this.destinationPath('test/' + this.answers['projectPath'] + '/MyClass.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.answers['projectName'],
        projectPath: this.answers['projectPath'],
        authorName: this.answers['authorName'],
        authorEmail: this.answers['authorEmail'],
        companyName: this.answers['companyName']
      }
    ) ;

  }

  _setupDocumentation ()
  {

    this.fs.write
    (
      this.destinationPath('docs/.gitkeep'),
      ''
    ) ;

  }

} ;