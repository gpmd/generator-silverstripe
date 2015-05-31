'use strict';

/* Dependencies */

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _s = require('underscore.string');

/* Vars */

var sharedDir = 'shared/';
var trackedDir = 'site/';
var tempDir = '.tmp/';
var webRoot = trackedDir + 'public_html/';
var webRootThemesDir = webRoot + 'themes/';
var srcThemesDir = trackedDir + 'themes/';
var srcThemeDistDir = 'dist/';
var srcThemeTemplatesDir = 'templates/';
var silverstripeRepo = 'https://github.com/silverstripe/silverstripe-installer.git';
var tempSilverstripeInstallerDir = tempDir + 'silverstripe-installer/';
var gruntFrontendBoilerplateRepo = 'https://github.com/matt-bailey/grunt-frontend-boilerplate.git';
var tempGruntFrontendBoilerplateDir = tempDir + 'grunt-frontend-boilerplate/';
var itcssBoilerplateRepo = 'https://github.com/gpmd/itcss-boilerplate.git';
var tempItcssBoilerplateDir = tempDir + 'itcss-boilerplate/';
var successMessage = 'Done';

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.pkg = require('../package.json');
  },

  askFor: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the Yeoman ' + chalk.blue('Silverstripe') + ' generator!'
    ));

    /* User defined data */

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Enter project name',
      default: 'my-project'
    }, {
      type: 'input',
      name: 'projectVersion',
      message: 'Enter project version',
      default: '0.0.1'
    }, {
      type: 'input',
      name: 'yourEmail',
      message: 'Enter your email',
      default: 'dev@gpmd.co.uk'
    }, {
      type: 'input',
      name: 'silverstripeVersion',
      message: 'Enter SilverStripe Version',
      default: '3.1.13'
    }, {
      type: 'input',
      name: 'silverstripeDbHost',
      message: 'Enter SilverStripe Database Host',
      default: '127.0.0.1'
    }, {
      type: 'input',
      name: 'silverstripeDbName',
      message: 'Enter SilverStripe Database Name',
      default: 'my-project'
    }, {
      type: 'input',
      name: 'silverstripeDbUsername',
      message: 'Enter SilverStripe Database Username',
      default: 'root'
    }, {
      type: 'input',
      name: 'silverstripeDbPassword',
      message: 'Enter SilverStripe Database Password',
      default: ''
    }];

    this.log(chalk.green('Tell me a bit about your project...'));
    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.projectVersion = props.projectVersion;
      this.yourEmail = props.yourEmail;
      this.silverstripeVersion = props.silverstripeVersion;
      this.silverstripeDbHost = props.silverstripeDbHost;
      this.silverstripeDbName = props.silverstripeDbName;
      this.silverstripeDbUsername = props.silverstripeDbUsername;
      this.silverstripeDbPassword = props.silverstripeDbPassword;
      this.srcThemeDir = srcThemesDir + props.projectName + '/';
      done();
    }.bind(this));
  },

  app: function () {

    /* Create core directories */

    this.log(chalk.green('Creating core directories...'));
    this.mkdir(sharedDir + 'assets/Uploads');
    this.mkdir(sharedDir + 'silverstripe-cache');
    this.mkdir(webRoot + 'themes');
    this.mkdir(this.srcThemeDir + srcThemeDistDir);
    this.mkdir(this.srcThemeDir + srcThemeTemplatesDir + 'Widgets');
    this.log(chalk.green.bold(successMessage));

    /* Copy core files */

    this.log(chalk.green('Copying core project files...'));

    // Core project files
    this.copy('_silverstripe-excludes.txt', tempDir + 'silverstripe-excludes.txt');
    this.template('__ss_environment.php', sharedDir + '_ss_environment.php', {
      projectName: this.projectName,
      yourEmail: this.yourEmail,
      silverstripeDbHost: this.silverstripeDbHost,
      silverstripeDbName: this.silverstripeDbName,
      silverstripeDbUsername: this.silverstripeDbUsername,
      silverstripeDbPassword: this.silverstripeDbPassword,
      webRoot: webRoot
    });
    this.template('_composer.json', trackedDir + 'composer.json');
    this.copy('_grunt-frontend-boilerplate-excludes.txt', tempDir + 'grunt-frontend-boilerplate-excludes.txt');
    this.copy('_itcss-boilerplate-excludes.txt', tempDir + 'itcss-boilerplate-excludes.txt');
    this.template('_gitignore', trackedDir + '.gitignore');
    this.copy('gitattributes', trackedDir + '.gitattributes');
    this.template('_bower.json', this.srcThemeDir + 'bower.json');
    this.copy('bowerrc', this.srcThemeDir + '.bowerrc');
    this.copy('jshintrc', this.srcThemeDir + '.jshintrc');
    this.copy('editorconfig', this.srcThemeDir + '.editorconfig');

    // Silverstripe theme files
    this.copy('_Page.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Page.ss');
    this.copy('_PageLayout.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Layout/Page.ss');
    this.copy('_BreadCrumbs.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/BreadCrumbs.ss');
    this.copy('_BrowseHappy.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/BrowseHappy.ss');
    this.copy('_Footer.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/Footer.ss');
    this.copy('_GoogleAnalytics.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/GoogleAnalytics.ss');
    this.copy('_Head.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/Head.ss');
    this.copy('_Header.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/Header.ss');
    this.copy('_Navigation.ss', this.srcThemeDir + srcThemeTemplatesDir + 'Includes/Navigation.ss');
    this.copy('_favicon-16x16.png', webRoot + 'favicon-16x16.png');
    this.copy('_editor.scss', tempDir + 'editor.scss');

    this.log(chalk.green.bold(successMessage));
  },

  install: function () {

    this.on('end', function () {
      if (!this.options['skip-install']) {

        /**
         * Run the following tasks consecutively
         */

        /* Process tasks */

        this.processTask = function (task) {
          this.log(chalk.green(task.msg));
          this.spawnCommand(task.cmd, task.args, task.opts)
          .on('exit', function (err) {
            if (err) {
              this.log.error(chalk.red.bold('Choke... Error: ' + err));
            } else {
              this.emit('nextTask');
            }
          }.bind(this));
        };

        /* Move to next task */

        this.on('nextTask', function () {
          var next = this.tasks.shift();
          if (next) {
            this.log(chalk.green.bold(successMessage));
            this.processTask(next);
          } else {
            this.createSymlinks();
            this.setSharedPermissions();
            this.cleanUp();
            this.log(chalk.green.bold('Yo, all done!'));
          }
        });

        /* Task config */

        // Prep
        this.tasks = [];

        // Clone silverstripe repo
        this.tasks.push({
          cmd: 'git',
          args: [
            'clone',
            silverstripeRepo,
            tempSilverstripeInstallerDir
          ],
          msg: 'Cloning silverstripe-installer repo...'
        });

        // Move silverstripe files
        this.tasks.push({
          cmd: 'rsync',
          args: [
            '-vaz',
            '--exclude-from',
            tempDir + 'silverstripe-excludes.txt',
            tempSilverstripeInstallerDir,
            webRoot
          ],
          msg: 'Moving required silverstripe-installer files...'
        });

        // Clone grunt-frontend-boilerplate repo
        this.tasks.push({
          cmd: 'git',
          args: [
            'clone',
            gruntFrontendBoilerplateRepo,
            tempGruntFrontendBoilerplateDir
          ],
          msg: 'Cloning grunt-frontend-boilerplate repo...'
        });

        // Move grunt-frontend-boilerplate files
        this.tasks.push({
          cmd: 'rsync',
          args: [
            '-vaz',
            '--exclude-from',
            tempDir + 'grunt-frontend-boilerplate-excludes.txt',
            tempGruntFrontendBoilerplateDir,
            this.srcThemeDir
          ],
          msg: 'Moving required grunt-frontend-boilerplate files...'
        });

        // Clone itcss-boilerplate repo
        this.tasks.push({
          cmd: 'git',
          args: [
            'clone',
            itcssBoilerplateRepo,
            tempItcssBoilerplateDir
          ],
          msg: 'Cloning itcss-boilerplate repo...'
        });

        // Move itcss-boilerplate files
        this.tasks.push({
          cmd: 'rsync',
          args: [
            '-vaz',
            '--exclude-from',
            tempDir + 'itcss-boilerplate-excludes.txt',
            tempItcssBoilerplateDir,
            this.srcThemeDir + 'src/styles/'
          ],
          msg: 'Moving required itcss-boilerplate files...'
        });

        // Move editor.scss
        this.tasks.push({
          cmd: 'cp',
          args: [
            tempDir + 'editor.scss',
            this.srcThemeDir + 'src/styles/editor.scss'
          ],
          msg: 'Moving SilverStripe editor.scss...'
        });

        // npm install
        this.tasks.push({
          cmd: 'npm',
          args: ['install'],
          opts: {
            cwd: this.srcThemeDir
          },
          msg: 'Installing npm dependencies...'
        });

        // bower install
        this.tasks.push({
          cmd: 'bower',
          args: ['install'],
          opts: {
            cwd: this.srcThemeDir
          },
          msg: 'Installing bower components...'
        });

        // Grunt build
        this.tasks.push({
          cmd: 'grunt',
          args: [],
          opts: {
            cwd: this.srcThemeDir
          },
          msg: 'Building the theme...'
        });

        // composer install
        this.tasks.push({
          cmd: 'composer',
          args: ['install'],
          opts: {
            cwd: trackedDir
          },
          msg: 'Installing SilverStripe dependencies...'
        });

        /* Start the tasks */

        this.processTask(this.tasks.shift());

        /* Finish and clean up */

        this.createSymlinks = function () {
          this.log(chalk.green('Creating shared directory symlinks...'));
          this.spawnCommand('ln', ['-s', '../../' + sharedDir + 'assets', 'assets'], { cwd: webRoot });
          this.spawnCommand('ln', ['-s', '../../' + sharedDir + 'silverstripe-cache', 'silverstripe-cache'], { cwd: webRoot });
          this.spawnCommand('ln', ['-s', '../../' + sharedDir + '_ss_environment.php', '_ss_environment.php'], { cwd: webRoot });

          this.log(chalk.green('Creating theme directory symlinks...'));
          this.spawnCommand('ln', ['-s', '../../../' + this.srcThemeDir + srcThemeDistDir, this.projectName], { cwd: webRootThemesDir });
          this.spawnCommand('ln', ['-s', '../' + srcThemeTemplatesDir + '.', _s.rtrim(srcThemeTemplatesDir, '/')], { cwd: this.srcThemeDir + srcThemeDistDir });
        }

        this.setSharedPermissions = function () {
          this.log(chalk.green('Setting shared directory permissions...'));
          this.spawnCommand('chmod', ['-R', 'a+rwx', sharedDir + 'assets', sharedDir + 'silverstripe-cache']);
        }

        this.cleanUp = function () {
          this.log(chalk.green('Cleaning up...'));
          this.spawnCommand('rm', ['-rf', tempDir]);
        }

      }
    });

  }
});
