# sfdc-gulp-travisci-boilerplate

This is a straightforward boilerplate for anyone who wants to quickly start developing for Salesforce using [gulp](http://gulpjs.com/), [travis-ci](https://travis-ci.com) and some other little gizmos ([gulp-force-developer](https://github.com/jkentjnr/gulp-force-developer) & [nforce](https://github.com/kevinohara80/nforce)).

[![Build Status](https://travis-ci.org/jkentjnr/sfdc-gulp-travisci-boilerplate.svg?branch=master)](https://travis-ci.org/jkentjnr/sfdc-gulp-travisci-boilerplate)

To see an example of the TravisCI functionality, click the build status button above.  This project is hooked into TravisCI and everytime there is a commit, TravisCI executes the `gulp test` command and publishes the output of the test process.

## Components and their Role

 - [gulp](http://gulpjs.com/): Used to handle deployments to dev and to execute tests.
 - [travis-ci](https://travis-ci.com): Cloud-based continous integration. Runs a test build on each commit.
 - [gulp-force-developer](https://github.com/jkentjnr/gulp-force-developer): Enables a project to use any folder structure and still publish to Salesforce; breaks away from the standard package project folder structure.  Can also detect changes in files and facilitate partial package deployments; useful in development.
 - [nforce](https://github.com/kevinohara80/nforce) & [nforce-metadata](https://github.com/kevinohara80/nforce): @kevinohara80 excellent libraries are used to deploy to development and test.
 
#### Included Scripts 

 - nForceDeployer (./bin/build): Handles the deployments to development and test.  Renders the deployment report to the gulp console.

## Getting Started

Clone this repo and execute the below commands:

    $ git clone https://github.com/jkentjnr/sfdc-gulp-travisci-boilerplate.git <<projectName>>
    $ cd <<projectName>>
    $ npm install

Setup an empty Salesforce instance for testing.
Create a connected app (OAuth) and configure package.json or environment variables.

Setup an empty Salesforce instance for development.
Create a connected app (OAuth) and configure package.json or environment variables.
If you just want to evaluate TravisCI functionality, you can skip setting and configuring up a development instance.

Create a repo and connect to TravisCI.
Configure TravisCI environment variables under Settings.

Please note: This project uses gulp 4.0.  This is pre-release but, in the main, has been stable for over a year.  See more about using gulp 4.0 [here](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html).

## Commands

### deploy (recent changes)
Deploys the most recent changes to development.

    $ gulp
    or
    $ npm run env:deploy (*NIX only)

### deploy (full package)
Deploys the full package to development.

    $ gulp deploy-all
    or
    $ npm run env:deploy-all (*NIX only)

### reset
Clears the file change cache.

    $ gulp reset

### test
Execute a full test against the TEST instance.
Does not commit any changes.

    $ gulp test
    or
    $ npm run env:test (*NIX only)

## Configuration

Either make changes to the package.json or set environment variables.  Environment settings trump package.json settings.

#### package.json

```
package.json
== sfdcEnvironment
    == development
       -- redirectUri (Optional)
       -- oauthClientId (Required)
       -- oauthSecretId (Required)
       -- username (Required)
       -- password (Required)
       -- token (Required)
    == test
       -- redirectUri (Optional)
       -- oauthClientId (Required)
       -- oauthSecretId (Required)
       -- username (Required)
       -- password (Required)
       -- token (Required)
== forceDeveloperConfig
    -- projectBaseDirectory (Optional but Useful)
    -- outputPackageZip (Required -- typically "./.package/package.zip")
    -- apiVersion (Optional but Useful) 
    -- (See [repo](https://github.com/jkentjnr/gulp-force-developer) for more options)
```

#### Environment Settings

*NIX only: Create an `.env` file with the below configuration. Execute using 'npm run env:test', 'npm run env:deploy' or 'npm run env:deploy-all'.

Alternatively, look at foreman.

```
SFDC_TEST_USERNAME=james.kent@travisci.vertic.com.au
SFDC_TEST_PASSWORD=qwerty
SFDC_TEST_TOKEN=jKcdCgrqwertys6ywb8XwCxutO
SFDC_TEST_OAUTH_CLIENTID=qwertyZL0ppGP5UrAp2lygTnOt9ZS2jylYIrybVQ3253StPRH56CQds04pzLyzlMNVmKHVXUcLAdUap_MhSIXe
SFDC_TEST_OAUTH_SECRETID=qwerty1790270708891

SFDC_DEV_USERNAME=james.kent@development.vertic.com.au
SFDC_DEV_PASSWORD=qwerty
SFDC_DEV_TOKEN=qwertySKDs6ywb8XwCxutO
SFDC_DEV_OAUTH_CLIENTID=qwertyuL0ppGP5UrAp2lygTnOt9ZS2jylYIrybVQ3253StPRH56CQds04pzLyzlMNVmKHVXUcLAdUap_MhSIXe
SFDC_DEV_OAUTH_SECRETID=q12w3e4r790270708891
```
