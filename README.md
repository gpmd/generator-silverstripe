**Note: This is a work in progress and is likely to be modified frequently!**

# generator-silverstripe v0.0.2 [![Build Status](https://travis-ci.org/gpmd/generator-silverstripe.svg?branch=master)](https://travis-ci.org/gpmd/generator-silverstripe)

> A [Yeoman](http://yeoman.io/) generator for [SilverStripe](http://www.silverstripe.org/) CMS projects, including a basic [Grunt](http://gruntjs.com/) workflow.

## Getting Started

### What is it

A Yeoman generator that scaffolds out a bare-bones SilverStripe site, including a basic Grunt workflow ([grunt-frontend-boilerplate](https://github.com/matt-bailey/grunt-frontend-boilerplate)) for your theme assets.

### Requirements

1. [Node](http://nodejs.org/)
- [Yeoman](http://yeoman.io/) (this will also install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/))
- You'll need Apache, MySQL and PHP to be running (you could use [MAMP](http://www.mamp.info/en/) or [this guide](http://akrabat.com/php/setting-up-php-mysql-on-os-x-yosemite/) if you're on OS X Yosemite)
- An empty MySQL database ready
- The local domain name of your site added to your `/etc/hosts` file, eg. `127.0.0.1 my-project.dev`
- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

### Installation

```bash
npm install -g generator-silverstripe
```

### How to use it

Once you're satisfied your system meets the above requirements run the following command in an empty directory and answer the questions it asks you:

```bash
yo silverstripe
```

Then visit the local domain you set up in your browser, eg. `http://my-project.dev`, and you should see a very basic SilverStripe install.

### Admin access

**Admin URL:** `http://my-project/admin`<br>
**Admin username:** `admin`<br>
**Admin password:** `password`

### Directory structure

The generator scaffolds out a project with the following structure:

```
# Do not track `shared` directory in Git
# These directories and files are symlinked into the `site` directory

shared/
shared/assets/
shared/silverstripe-cache/
shared/_ss_environment.php

# Make `site` your Git root

site/
site/public_html/ # SilverStripe cms, framework, my-site, modules etc.
site/themes/
site/themes/[my-project]/ # Theme assets and templates, Bower components, Grunt workflow etc.
```

### A note on version control

When you initialise the project as a git repo make sure `site/` is the root version controlled directory. You should not track the `shared/` directory.

### To do

- Add basic Sass directory structure

### Help

This is provided as-is - use at your peril! Feel free to [post issues on github](https://github.com/gpmd/generator-silverstripe/issues) and we'll try to respond in a timely fashion.


### Made by

[Matt Bailey](http://mattbailey.io/)
