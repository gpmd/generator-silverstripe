**Note: This is very much a work in progress and is likely to be modified frequently!**

# generator-silverstripe [![Build Status](https://travis-ci.org/gpmd/generator-silverstripe.svg?branch=master)](https://travis-ci.org/gpmd/generator-silverstripe)

> A [Yeoman](http://yeoman.io/) generator for [SilverStripe](http://www.silverstripe.org/) CMS projects

## Getting Started

### What is it

It scaffolds out a bare-bones SilverStripe site for local development, including a basic [Grunt](http://gruntjs.com/) workflow for your theme.

### Requirements

1. [Node](http://nodejs.org/)
- [Yeoman](http://yeoman.io/) (this will also install [Grunt](http://gruntjs.com/) and [Bower](http://bower.io/))
- You'll need Apache, MySQL and PHP to be running
- An empty MySQL database
- The local domain name of your site added to your `/etc/hosts` file, eg. `127.0.0.1 my-project.dev`
- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)

You could use something like [MAMP](http://www.mamp.info/en/) to manage Apache, MySQL and PHP, or set them up yourself - [here's a helpful guide](http://akrabat.com/php/setting-up-php-mysql-on-os-x-yosemite/) (if you're on OS X Yosemite).

### How to use it

Once you're satisfied your system meets the above requirements run the following command in an empty directory and answer the questions it asks you:

```bash
yo silverstripe
```

Then visit the local domain you set up in your browser, eg. `http://my-project.dev`, and you should see a very basic SilverStripe install.

### Admin access

Admin URL: `http://my-project/admin`

Admin username: `admin`

Admin password: `password`

### Git

When you initialise the project as a git repo make `site/` the root directory. You should not track the `shared/` directory.

### Help

This is provided as-is - use at your peril!

Feel free to [post issues on github](https://github.com/gpmd/generator-silverstripe/issues) and we'll try to respond in a timely fashion.


### Made by

[Matt Bailey](http://mattbailey.io/)
