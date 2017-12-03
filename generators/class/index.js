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
        className: 'MyNewClass',
        parentClassName: '',
        folder: '',
        headerOnly: false,
        generateTest: true
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

    if (this.options.auto)
    {
      this.interactive = false ;
    }

    this.argument('name', { type: String, required: false }) ;

    if (this.options.name)
    {
      this.config.set('className', this.options.name) ;
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
          default: this.config.get('className')
        },
        {
          name: 'parentClassName',
          message: 'Inherits from:',
          default: this.config.get('parentClassName')
        },
        {
          name: 'folder',
          message: 'In folder (src/...):',
          default: this.config.get('folder')
        },
        {
          name: 'headerOnly',
          message: 'Header only?',
          type: 'confirm',
          default: this.config.get('headerOnly')
        },
        {
          name: 'generateTest',
          when: (answers) => { return this.config.get('buildTest') ; },
          message: 'Generate test?',
          type: 'confirm',
          default: this.config.get('generateTest')
        }
      ]
    )
    .then 
    (
      (answers) =>
      {
        
        this.config.set('className', answers['className']) ;
        this.config.set('parentClassName', answers['parentClassName']) ;
        this.config.set('folder', answers['folder']) ;
        this.config.set('headerOnly', answers['headerOnly']) ;
        this.config.set('generateTest', answers['generateTest']) ;

      }
    ) ;

  }

  configuring ()
  {

    this.config.set('classNameLower', this.config.get('className').toLowerCase()) ;
    this.config.set('folder', (this.config.get('folder') == '') ? '' : (this.config.get('folder') + '/')) ;
    
  }
  
  default ()
  {
    
  }
  
  writing ()
  {

    this._generateHeader() ;

    if (!this.config.get('headerOnly'))
    {
      this._generateSource() ;
    }

    if (this.config.get('buildTest') && this.config.get('generateTest'))
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
    this.config.save() ;
  }

  // Private methods

  _generateHeader ()
  {

    this.fs.copyTpl
    (
      this.templatePath('include/MyClass.hpp'),
      this.destinationPath('include/' + this.config.get('projectPath') + '/' + this.config.get('folder') + this.config.get('className') + '.hpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.config.get('className'),
        parentClassName: this.config.get('parentClassName'),
        folder: this.config.get('folder')
      }
    ) ;

  }
  
  _generateSource ()
  {

    this.fs.copyTpl
    (
      this.templatePath('src/MyClass.cpp'),
      this.destinationPath('src/' + this.config.get('projectPath') + '/' + this.config.get('folder') + this.config.get('className') + '.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.config.get('className'),
        parentClassName: this.config.get('parentClassName'),
        folder: this.config.get('folder')
      }
    ) ;

  }

  _generateTest ()
  {

    this.fs.copyTpl
    (
      this.templatePath('test/MyClass.test.cpp'),
      this.destinationPath('test/' + this.config.get('projectPath') + '/' + this.config.get('folder') + this.config.get('className') + '.test.cpp'),
      {
        year: this.year,
        date: this.date,
        projectName: this.config.get('projectName'),
        projectPath: this.config.get('projectPath'),
        authorName: this.config.get('authorName'),
        authorEmail: this.config.get('authorEmail'),
        companyName: this.config.get('companyName'),
        className: this.config.get('className'),
        parentClassName: this.config.get('parentClassName'),
        folder: this.config.get('folder')
      }
    ) ;

  }

} ;