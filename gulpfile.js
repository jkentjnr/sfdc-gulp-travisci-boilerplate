"use strict";

var fs = require('fs'),
	path = require('path'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	nForceDeployer = require('./bin/build/nForceDeployer'),
	nforce = require('nforce');

// load the nforce-metadata plugin
require('nforce-metadata')(nforce);

require('gulp-force-developer').registerForGulp(gulp, gutil);

// ----------------------------------------------------------------
// Read configuration from package.json (if possible).

const packageFile = './package.json';

var sfdcEnvironment_DEV = {},
	sfdcEnvironment_TEST = {},
	sfdcForceDeveloperConfig = {};

if (fs.existsSync(packageFile) === true) {
  var config = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

  if (config.sfdcEnvironment !== undefined) {
  	if (config.sfdcEnvironment.development !== undefined) 
  		sfdcEnvironment_DEV = config.sfdcEnvironment.development;
	if (config.sfdcEnvironment.test !== undefined)
		sfdcEnvironment_TEST = config.sfdcEnvironment.test;
  }

  if (config.forceDeveloperConfig !== undefined) 
  	sfdcForceDeveloperConfig = config.forceDeveloperConfig;
}

// ----------------------------------------------------------------

const defaultOutputPackageZip = './.package/package.zip',
	  defaultRedirectUri = 'http://localhost:3000/oauth/_callback';

var salesforcePackageFile = process.env.SFDC_PACKAGEFILE || sfdcForceDeveloperConfig.outputPackageZip || defaultOutputPackageZip,
	oauthRedirectUri_TEST = process.env.SFDC_TEST_OAUTH_REDIRECTURI || sfdcEnvironment_TEST.redirectUri || defaultRedirectUri,
    oauthClientId_TEST = process.env.SFDC_TEST_OAUTH_CLIENTID || sfdcEnvironment_TEST.oauthClientId,
    oauthSecretId_TEST = process.env.SFDC_TEST_OAUTH_SECRETID || sfdcEnvironment_TEST.oauthSecretId,
    username_TEST = process.env.SFDC_TEST_USERNAME || sfdcEnvironment_TEST.username,
    password_TEST = process.env.SFDC_TEST_PASSWORD || sfdcEnvironment_TEST.password,
    token_TEST = process.env.SFDC_TEST_TOKEN || sfdcEnvironment_TEST.token,
	oauthRedirectUri_DEV = process.env.SFDC_DEV_OAUTH_REDIRECTURI || sfdcEnvironment_DEV.redirectUri || defaultRedirectUri,
    oauthClientId_DEV = process.env.SFDC_DEV_OAUTH_CLIENTID || sfdcEnvironment_DEV.oauthClientId,
    oauthSecretId_DEV = process.env.SFDC_DEV_OAUTH_SECRETID || sfdcEnvironment_DEV.oauthSecretId,
    username_DEV = process.env.SFDC_DEV_USERNAME || sfdcEnvironment_DEV.username,
    password_DEV = process.env.SFDC_DEV_PASSWORD || sfdcEnvironment_DEV.password,
    token_DEV = process.env.SFDC_DEV_TOKEN || sfdcEnvironment_DEV.token;

/// TODO: Add validation.

// ----------------------------------------------------------------
// REGISTER GULP TASKS

gulp.task('nforce-deploy-test', function() {

	var org = nforce.createConnection({
		clientId: oauthClientId_TEST,
		clientSecret: oauthSecretId_TEST,
		redirectUri: oauthRedirectUri_TEST,
		username: username_TEST, 
		password: password_TEST, 
		securityToken: token_TEST,
		metaOpts: {       // options for nforce-metadata
			interval: 2000  // poll interval can be specified (optional)
		},
		plugins: ['meta'] // loads the plugin in this connection
	});

	return nForceDeployer.executeAllTests(org, path.resolve(salesforcePackageFile));

});

gulp.task('nforce-deploy', function() {

	var org = nforce.createConnection({
		clientId: oauthClientId_DEV,
		clientSecret: oauthSecretId_DEV,
		redirectUri: oauthRedirectUri_DEV,
		username: username_DEV, 
		password: password_DEV, 
		securityToken: token_DEV,
		metaOpts: {       // options for nforce-metadata
			interval: 2000  // poll interval can be specified (optional)
		},
		plugins: ['meta'] // loads the plugin in this connection
	});

	return nForceDeployer.deploy(org, path.resolve(salesforcePackageFile));

});

// Deploys the most recent changes to DEV
gulp.task('default', gulp.series(
	'force-package-config',
	'force-package',
	'force-zip',
	'nforce-deploy',
	'force-commit'
));

// Deploys the full package to DEV
gulp.task('deploy-all', gulp.series(
	'force-package-config',
	'force-package-all',
	'force-zip',
	'nforce-deploy',
	'force-commit'
));

// Clears the filechange cache
gulp.task('reset', gulp.series(
	'force-reset'
));

// Execute a full test against the TEST instance.
//  - Does not commit any changes.
gulp.task('test', gulp.series(
	'force-package-config',
	'force-package-all',
	'force-zip',
	'nforce-deploy-test'
));

// Ensures a failure result code is returned on error.
gulp.on('error', process.exit.bind(process, 1));
