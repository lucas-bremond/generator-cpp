const Generator = require('yeoman-generator') ;
const moment = require('moment') ;

module.exports = class extends Generator
{

  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;

    this.config.getAll() ;

    this.config.defaults
    (
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
        unitTestType: 'gtest',
        buildCodeCoverage: false,
        buildDocumentation: false
      }
    ) ;

    this.interactive = true ;

    this.option
    (
      'auto',
      {
        desc: 'Automatic mode',
        type: Boolean,
        default: false
      }
    ) ;
    
    this.option
    (
      'coverage',
      {
        desc: 'Enable code coverage',
        type: Boolean,
        default: false
      }
    ) ;

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    if (this.options.coverage)
    {
      this.config.set('buildCodeCoverage', true) ;
    }

    this.argument('name', { type: String, required: false }) ;
    this.argument('author', { type: String, required: false }) ;
    this.argument('email', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.config.set('projectName', this.options.name) ;
      this.config.set('projectPath', this.options.name) ;
      this.config.set('projectPackage', this.options.name) ;
      this.interactive = false ;
    }

    if (this.options.author)
    {
      this.config.set('authorName', this.options.author) ;
      this.interactive = false ;
    }

    if (this.options.email)
    {
      this.config.set('authorEmail', this.options.email) ;
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
          default: this.config.get('projectName')
        },
        {
          type: 'input',
          name: 'projectDescription',
          message: 'Project description:',
          default: this.config.get('projectDescription')
        },
        {
          type: 'input',
          name: 'projectPath',
          message: 'Project path:',
          default: this.config.get('projectPath')
        },
        {
          type: 'input',
          name: 'projectPackage',
          message: 'Project package name:',
          default: this.config.get('projectPackage')
        },
        {
          type: 'input',
          name: 'projectLicense',
          message: 'Project license:',
          default: this.config.get('projectLicense')
        },
        {
          type: 'input',
          name: 'authorName',
          message: 'Author name:',
          default: this.config.get('authorName')
        },
        {
          type: 'input',
          name: 'authorEmail',
          message: 'Author e-mail:',
          default: this.config.get('authorEmail')
        },
        {
          type: 'input',
          name: 'companyName',
          message: 'Company name:',
          default: this.config.get('companyName')
        },
        {
          type: 'input',
          name: 'companyId',
          message: 'Company ID:',
          default: this.config.get('companyId')
        },
        {
          type: 'input',
          name: 'companyWebsite',
          message: 'Company website:',
          default: this.config.get('companyWebsite')
        },
        {
          type: 'confirm',
          name: 'buildSharedLib',
          message: 'Would you like to build a shared library?',
          default: this.config.get('buildSharedLib')
        },
        {
          type: 'confirm',
          name: 'buildStaticLib',
          message: 'Would you like to build a static library?',
          default: this.config.get('buildStaticLib')
        },
        {
          type: 'confirm',
          name: 'buildUtility',
          message: 'Would you like to build a utility?',
          default: this.config.get('buildUtility')
        },
        {
          type: 'confirm',
          name: 'buildTest',
          message: 'Would you like to build the unit tests?',
          default: this.config.get('buildTest')
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
          default: this.config.get('unitTestType')
        },
        {
          type: 'confirm',
          when: (answers) => { return answers.buildTest ; },
          name: 'buildCodeCoverage',
          message: 'Would you like to run the code coverage analysis?',
          default: this.config.get('buildCodeCoverage')
        },
        {
          type: 'confirm',
          name: 'buildDocumentation',
          message: 'Would you like to build the documentation?',
          default: this.config.get('buildDocumentation')
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.config.set('projectName', answers['projectName']) ;
        this.config.set('projectDescription', answers['projectDescription']) ;
        this.config.set('projectPath', answers['projectPath']) ;
        this.config.set('projectPackage', answers['projectPackage']) ;
        this.config.set('projectLicense', answers['projectLicense']) ;
        this.config.set('authorName', answers['authorName']) ;
        this.config.set('authorEmail', answers['authorEmail']) ;
        this.config.set('companyName', answers['companyName']) ;
        this.config.set('companyId', answers['companyId']) ;
        this.config.set('companyWebsite', answers['companyWebsite']) ;
        this.config.set('buildSharedLib', answers['buildSharedLib']) ;
        this.config.set('buildStaticLib', answers['buildStaticLib']) ;
        this.config.set('buildUtility', answers['buildUtility']) ;
        this.config.set('buildTest', answers['buildTest']) ;
        this.config.set('unitTestType', answers['unitTestType']) ;
        this.config.set('buildCodeCoverage', answers['buildCodeCoverage']) ;
        this.config.set('buildDocumentation', answers['buildDocumentation']) ;
        
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

    if (this.config.get('buildUtility'))
    {
      this._setupUtility() ;
    }

    if (this.config.get('buildTest'))
    {
      this._setupTest() ;
    }

    if (this.config.get('buildCodeCoverage'))
    {
      this._setupCodeCoverage() ;
    }

    if (this.config.get('buildDocumentation'))
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
    this.config.save() ;
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
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectDescription: this.config.get('projectDescription'),
        projectPath: this.config.get('projectPath'),
        projectPackage: this.config.get('projectPackage'),
        projectLicense: this.config.get('projectLicense'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        companyId: this.config.get('companyId'),
        companyWebsite: this.config.get('companyWebsite'),
        buildSharedLib: this.config.get('buildSharedLib'),
        buildStaticLib: this.config.get('buildStaticLib'),
        buildUtility: this.config.get('buildUtility'),
        buildTest: this.config.get('buildTest'),
        buildCodeCoverage: this.config.get('buildCodeCoverage'),
        buildDocumentation: this.config.get('buildDocumentation')
      }
    ) ;
    
    this.fs.copyTpl
    (
      this.templatePath('Makefile'),
      this.destinationPath('Makefile'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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
        projectName: this.config.get('projectName'),
        projectDescription: this.config.get('projectDescription')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfig.cmake.in'),
      this.destinationPath('tools/cmake/' + this.config.get('projectPath') + 'Config.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        projectPackage: this.config.get('projectPackage'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('tools/cmake/CppProjectConfigVersion.cmake.in'),
      this.destinationPath('tools/cmake/' + this.config.get('projectPath') + 'ConfigVersion.cmake.in'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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
      this.destinationPath('include/' + this.config.get('projectPath') + '/MyClass.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('src/CppProject/MyClass.cpp'),
      this.destinationPath('src/' + this.config.get('projectPath') + '/MyClass.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('share/CppUtility/CMakeLists.txt'),
      this.destinationPath('share/CppUtility/CMakeLists.txt'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectDescription: this.config.get('projectDescription'),
        projectPath: this.config.get('projectPath'),
        projectPackage: this.config.get('projectPackage'),
        projectLicense: this.config.get('projectLicense'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        companyId: this.config.get('companyId'),
        companyWebsite: this.config.get('companyWebsite'),
        buildSharedLib: this.config.get('buildSharedLib'),
        buildStaticLib: this.config.get('buildStaticLib'),
        buildUtility: this.config.get('buildUtility'),
        buildTest: this.config.get('buildTest'),
        buildDocumentation: this.config.get('buildDocumentation')
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
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Main.test.cxx'),
      this.destinationPath('test/Main.test.cxx'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/Setup.test.hpp'),
      this.destinationPath('test/Setup.test.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
      }
    ) ;

    this.fs.copyTpl
    (
      this.templatePath('test/CppProject/MyClass.test.cpp'),
      this.destinationPath('test/' + this.config.get('projectPath') + '/MyClass.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName')
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