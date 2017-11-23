const Generator = require('yeoman-generator') ;
const moment = require('moment') ;

module.exports = class extends Generator
{

  // Constructor
  
  constructor (args, opts)
  {
    
    super (args, opts) ;
  
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
          name: 'className',
          message: 'Class name:',
          default: 'MyClass'
        },
        {
          name: 'parentClassName',
          message: 'Inherits from:',
          default: ''
        },
        {
          name: 'folder',
          message: 'In folder (src/...):',
          default: ''
        },
        {
          name: 'headerOnly',
          message: 'Header only?',
          type: 'confirm',
          default: false
        },
        {
          name: 'generateTest',
          message: 'Generate test?',
          type: 'confirm',
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

    this.classNameLower = this.answers['className'].toLowerCase() ;
    this.folder = (this.answers['folder'] == '') ? '' : (this.answers['folder'] + '/') ;
    
  }
  
  default ()
  {
    
  }
  
  writing ()
  {

    this._generateHeader() ;

    if (!this.answers['headerOnly'])
    {
      this._generateSource() ;
    }

    if (this.config.get('buildTest') && this.answers['generateTest'])
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
      this.destinationPath('include/' + this.config.get('projectPath') + '/' + this.folder + this.answers['className'] + '.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.answers['className'],
        parentClassName: this.answers['parentClassName'],
        folder: this.folder
      }
    ) ;

  }
  
  _generateSource ()
  {

    this.fs.copyTpl
    (
      this.templatePath('src/MyClass.cpp'),
      this.destinationPath('src/' + this.config.get('projectPath') + '/' + this.folder + this.answers['className'] + '.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.answers['className'],
        parentClassName: this.answers['parentClassName'],
        folder: this.folder
      }
    ) ;

  }

  _generateTest ()
  {

    this.fs.copyTpl
    (
      this.templatePath('test/MyClass.test.cpp'),
      this.destinationPath('test/' + this.config.get('projectPath') + '/' + this.folder + this.answers['className'] + '.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.answers['className'],
        parentClassName: this.answers['parentClassName'],
        folder: this.folder
      }
    ) ;

  }

} ;