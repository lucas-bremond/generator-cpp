const Generator = require('yeoman-generator') ;
const moment = require('moment') ;

module.exports = class extends Generator
{

  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;

    this.settings =
    {
      projectName: 'C++ Project',
      projectDescription: 'A pretty cool C++ project.',
      projectPath: 'CppProject',
      projectPackage: 'cpp-project',
      projectLicense: 'MIT License',
      authorName: 'Bob Marley',
      authorEmail: 'bob@marley.com',
      companyName: 'Company Inc.',
      companyId: 'com.company',
      companyWebsite: 'www.company.com',
      buildSharedLib: true,
      buildStaticLib: false,
      buildUtility: true,
      buildTest: true,
      buildCodeCoverage: true,
      unitTestType: 'gtest',
      buildDocumentation: true
    } ;

    this.interactive = true ;

    this.option('auto') ;

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    this.argument('name', { type: String, required: false }) ;
    this.argument('author', { type: String, required: false }) ;
    this.argument('email', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.settings.projectName = this.options.name ;
      this.settings.projectPath = this.options.name ;
      this.settings.projectPackage = this.options.name ;
      this.interactive = false ;
    }

    if (this.options.author)
    {
      this.settings.authorName = this.options.author ;
      this.interactive = false ;
    }

    if (this.options.email)
    {
      this.settings.authorEmail = this.options.email ;
      this.interactive = false ;
    }
  
  }

  // Run loop

  initializing ()
  {
    
    let currentDate = moment() ;

    this.year = currentDate.format('YYYY') ;
    this.date = currentDate.format('D MMM YYYY') ;

  }

  prompting ()
  {

    if (!this.interactive)
    {
      return ;
    }
    
    return this.prompt
    (
      [
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: this.settings.projectName
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Project description:',
          default: this.settings.projectDescription
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Project path:',
          default: this.settings.projectPath
        },
        {
          type: 'input',
          name: 'projectPackage',
          message: 'Project package name:',
          default: this.settings.projectPackage
        },
        {
          type: 'input',
          name: 'projectLicense',
          message: 'Project license:',
          default: this.settings.projectLicense
        },
        {
          type: 'input',
          name: 'authorName',
          message: 'Author name:',
          default: this.settings.authorName
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Author e-mail:',
          default: this.settings.authorEmail
        },
        {
          type: 'input',
          name: 'companyName',
          message: 'Company name:',
          default: this.settings.companyName
        },
        {
          type: 'input',
          name: 'companyId',
          message: 'Company ID:',
          default: this.settings.companyId
        },
        {
          type: 'input',
          name: 'companyWebsite',
          message: 'Company website:',
          default: this.settings.companyWebsite
        },
        {
          type: 'confirm',
          name: 'buildSharedLib',
          message: 'Would you like to build a shared library?',
          default: this.settings.buildSharedLib
        },
        {
          type: 'confirm',
          name: 'buildStaticLib',
          message: 'Would you like to build a static library?',
          default: this.settings.buildStaticLib
        },
        {
          type: 'confirm',
          name: 'buildUtility',
          message: 'Would you like to build a utility?',
          default: this.settings.buildUtility
        },
        {
          type: 'confirm',
          name: 'buildTest',
          message: 'Would you like to build the unit tests?',
          default: this.settings.buildTest
        },
        {
          type: 'list',
          when: (answers) => { return answers.buildTest ; },
          name: 'unitTestType',
          message: 'Select unit test framework type:',
          choices:
          [
            {
              name: 'Google Test',
              value: 'gtest'
            }
            // {
            //   name: 'CATCH (C++ Automated Test Cases in Headers)',
            //   value: 'catch'
            // }
          ],
          default: this.settings.unitTestType
        },
        {
          type: 'confirm',
          when: (answers) => { return answers.buildTest ; },
          name: 'buildCodeCoverage',
          message: 'Would you like to run the code coverage analysis?',
          default: this.settings.buildCodeCoverage
        },
        {
          type: 'confirm',
          name: 'buildDocumentation',
          message: 'Would you like to build the documentation?',
          default: this.settings.buildDocumentation
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.settings.projectName = answers['projectName'] ;
        this.settings.projectDescription = answers['projectDescription'] ;
        this.settings.projectPath = answers['projectPath'] ;
        this.settings.projectPackage = answers['projectPackage'] ;
        this.settings.projectLicense = answers['projectLicense'] ;
        this.settings.authorName = answers['authorName'] ;
        this.settings.authorEmail = answers['authorEmail'] ;
        this.settings.companyName = answers['companyName'] ;
        this.settings.companyId = answers['companyId'] ;
        this.settings.companyWebsite = answers['companyWebsite'] ;
        this.settings.buildSharedLib = answers['buildSharedLib'] ;
        this.settings.buildStaticLib = answers['buildStaticLib'] ;
        this.settings.buildUtility = answers['buildUtility'] ;
        this.settings.buildTest = answers['buildTest'] ;
        this.settings.unitTestType = answers['unitTestType'] ;
        this.settings.buildDocumentation = answers['buildDocumentation'] ;
        
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

    if (this.settings.buildUtility)
    {
      this._setupUtility() ;
    }

    if (this.settings.buildTest)
    {
      this._setupTest() ;
    }

    if (this.settings.buildCodeCoverage)
    {
      this._setupCodeCoverage() ;
    }

    if (this.settings.buildDocumentation)
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
    this.config.set(this.settings) ;
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
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
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
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectDescription: this.settings.projectDescription,
        projectPath: this.settings.projectPath,
        projectPackage: this.settings.projectPackage,
        projectLicense: this.settings.projectLicense,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName,
        companyId: this.settings.companyId,
        companyWebsite: this.settings.companyWebsite,
        buildSharedLib: this.settings.buildSharedLib,
        buildStaticLib: this.settings.buildStaticLib,
        buildUtility: this.settings.buildUtility,
        buildTest: this.settings.buildTest,
        buildCodeCoverage: this.settings.buildCodeCoverage,
        buildDocumentation: this.settings.buildDocumentation
      }
    ) ;
    
    this.fs.copyTpl
    (
      this.templatePath('Makefile'),
      this.destinationPath('Makefile'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
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
        projectName: this.settings.projectName,
        projectDescription: this.settings.projectDescription
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfig.cmake.in'),
      this.destinationPath('tools/cmake/' + this.settings.projectPath + 'Config.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        projectPackage: this.settings.projectPackage,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfigVersion.cmake.in'),
      this.destinationPath('tools/cmake/' + this.settings.projectPath + 'ConfigVersion.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
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
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
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
      this.destinationPath('include/' + this.settings.projectPath + '/MyClass.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('src/CppProject/MyClass.cpp'),
      this.destinationPath('src/' + this.settings.projectPath + '/MyClass.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

  }

  _setupUtility ()
  {

    this.fs.copyTpl
    (
      this.templatePath('share/CppUtility/src/MyUtility.cxx'),
      this.destinationPath('share/CppUtility/src/MyUtility.cxx'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('share/CppUtility/CMakeLists.txt'),
      this.destinationPath('share/CppUtility/CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectDescription: this.settings.projectDescription,
        projectPath: this.settings.projectPath,
        projectPackage: this.settings.projectPackage,
        projectLicense: this.settings.projectLicense,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName,
        companyId: this.settings.companyId,
        companyWebsite: this.settings.companyWebsite,
        buildSharedLib: this.settings.buildSharedLib,
        buildStaticLib: this.settings.buildStaticLib,
        buildUtility: this.settings.buildUtility,
        buildTest: this.settings.buildTest,
        buildDocumentation: this.settings.buildDocumentation
      }
    ) ;

  }

  _setupTest ()
  {

    this.fs.copy
    (
      this.templatePath('tools/cmake/FindGTest.cmake'),
      this.destinationPath('tools/cmake/FindGTest.cmake')
    ) ;

    this.fs.copy
    (
      this.templatePath('thirdparty/gtest/CMakeLists.txt'),
      this.destinationPath('thirdparty/gtest/CMakeLists.txt')
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Global.test.hpp'),
      this.destinationPath('test/Global.test.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Main.test.cxx'),
      this.destinationPath('test/Main.test.cxx'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Setup.test.hpp'),
      this.destinationPath('test/Setup.test.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/CppProject/MyClass.test.cpp'),
      this.destinationPath('test/' + this.settings.projectPath + '/MyClass.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.settings.projectName,
        projectPath: this.settings.projectPath,
        authorName: this.settings.authorName,
        authorEmail: this.settings.authorEmail,
        companyName: this.settings.companyName
      }
    ) ;

  }

  _setupCodeCoverage ()
  {

    this.fs.copy
    (
      this.templatePath('tools/cmake/CodeCoverage.cmake'),
      this.destinationPath('tools/cmake/CodeCoverage.cmake')
    ) ;

  }

  _setupDocumentation ()
  {

    this.fs.copy
    (
      this.templatePath('tools/cmake/DocumentationTargets.cmake'),
      this.destinationPath('tools/cmake/DocumentationTargets.cmake')
    ) ;

    this.fs.copy
    (
      this.templatePath('tools/doxygen'),
      this.destinationPath('tools/doxygen')
    ) ;

    this.fs.copy
    (
      this.templatePath('thirdparty/doxygen/CMakeLists.txt'),
      this.destinationPath('thirdparty/doxygen/CMakeLists.txt')
    ) ;

    this.fs.write
    (
      this.destinationPath('docs/.gitkeep'),
      ''
    ) ;

  }

} ;