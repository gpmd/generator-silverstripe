<?php

// Site name
define('SS_HOSTNAME','<%= _.slugify(projectName) %>');

// Canonical domain name
define('SS_DOMAIN_NAME','<%= _.slugify(projectName) %>.dev');

// Command line
global $_FILE_TO_URL_MAPPING;
$_FILE_TO_URL_MAPPING['/var/www/'.SS_HOSTNAME.'/<%= webRoot %>'] = 'http://'.SS_DOMAIN_NAME;

// Stage
define('SS_ENVIRONMENT_TYPE', 'dev');

// Database
define('SS_DATABASE_SERVER', '<%= silverstripeDbHost %>');
define('SS_DATABASE_USERNAME', '<%= silverstripeDbUsername %>');
define('SS_DATABASE_PASSWORD', '<%= silverstripeDbPassword %>');
define('SS_DATABASE_NAME', '<%= silverstripeDbName %>');

// Default login
define('SS_DEFAULT_ADMIN_USERNAME', 'admin');
define('SS_DEFAULT_ADMIN_PASSWORD', 'password');

// Email
define('SS_DEFAULT_EMAIL', '<%= yourEmail %>');

// Error logs
define('SS_ERROR_LOG', '<%= _.slugify(projectName) %>.log');
