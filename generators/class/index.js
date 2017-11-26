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
      className: 'MyNewClass',
      parentClassName: '',
      folder: '',
      headerOnly: false,
      generateTest: true
    } ;

    this.interactive = true ;

    this.option('auto') ;

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    this.argument('name', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.settings.className = this.options.name ;
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
          name: 'className',
          message: 'Class name:',
          default: this.settings.className
        },
        {
          name: 'parentClassName',
          message: 'Inherits from:',
          default: this.settings.parentClassName
        },
        {
          name: 'folder',
          message: 'In folder (src/...):',
          default: this.settings.folder
        },
        {
          name: 'headerOnly',
          message: 'Header only?',
          type: 'confirm',
          default: this.settings.headerOnly
        },
        {
          name: 'generateTest',
          when: (answers) => { return this.config.get('buildTest') ; },
          message: 'Generate test?',
          type: 'confirm',
          default: this.settings.generateTest
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.settings.className = answers['className'] ;
        this.settings.parentClassName = answers['parentClassName'] ;
        this.settings.folder = answers['folder'] ;
        this.settings.headerOnly = answers['headerOnly'] ;
        this.settings.generateTest = answers['generateTest'] ;

      }
    ) ;

  }

  configuring ()
  {

    this.settings.classNameLower = this.settings.className.toLowerCase() ;
    this.settings.folder = (this.settings.folder == '') ? '' : (this.settings.folder + '/') ;
    
  }
  
  default ()
  {
    
  }
  
  writing ()
  {

    this._generateHeader() ;

    if (!this.settings.headerOnly)
    {
      this._generateSource() ;
    }

    if (this.config.get('buildTest') && this.settings.generateTest)
    {
      this._generateTest() ;
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
    
  }

  // Private methods

  _generateHeader ()
  {

    this.fs.copyTpl
    (
      this.templatePath('include/MyClass.hpp'),
      this.destinationPath('include/' + this.config.get('projectPath') + '/' + this.settings.folder + this.settings.className + '.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.settings.className,
        parentClassName: this.settings.parentClassName,
        folder: this.settings.folder
      }
    ) ;

  }
  
  _generateSource ()
  {

    this.fs.copyTpl
    (
      this.templatePath('src/MyClass.cpp'),
      this.destinationPath('src/' + this.config.get('projectPath') + '/' + this.settings.folder + this.settings.className + '.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.settings.className,
        parentClassName: this.settings.parentClassName,
        folder: this.settings.folder
      }
    ) ;

  }

  _generateTest ()
  {

    this.fs.copyTpl
    (
      this.templatePath('test/MyClass.test.cpp'),
      this.destinationPath('test/' + this.config.get('projectPath') + '/' + this.settings.folder + this.settings.className + '.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.settings.className,
        parentClassName: this.settings.parentClassName,
        folder: this.settings.folder
      }
    ) ;

  }

} ;