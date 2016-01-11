# sfdc-gulp-travisci-boilerplate

[![Build Status](https://travis-ci.org/jkentjnr/sfdc-gulp-travisci-boilerplate.svg?branch=master)](https://travis-ci.org/jkentjnr/sfdc-gulp-travisci-boilerplate)

This is a straightforward boilerplate for anyone who wants to quickly start developing for Salesforce using [gulp](http://gulpjs.com/), [travis-ci](https://travis-ci.com) and some other little gizmos ([gulp-force-developer](https://github.com/jkentjnr/gulp-force-developer) & [nforce](https://github.com/kevinohara80/nforce)).


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

## Commands

### deploy (recent changes)
Deploys the most recent changes to development.

    $ gulp

### deploy (full package)
Deploys the full package to development.

    $ gulp deploy

### reset
Clears the file change cache.

    $ gulp reset

### test
Execute a full test against the TEST instance.
Does not commit any changes.

    $ gulp test

## Configuration

Either make changes to the package.json or set environment variables.

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

#### Environment Settings (Terminal / Bash)

```
export SFDC_TEST_USERNAME=james.kent@travisci.vertic.com.au
export SFDC_TEST_PASSWORD=qwerty
export SFDC_TEST_TOKEN=jKcdCgrqwertys6ywb8XwCxutO
export SFDC_TEST_OAUTH_CLIENTID=qwertyZL0ppGP5UrAp2lygTnOt9ZS2jylYIrybVQ3253StPRH56CQds04pzLyzlMNVmKHVXUcLAdUap_MhSIXe
export SFDC_TEST_OAUTH_SECRETID=qwerty1790270708891

export SFDC_DEV_USERNAME=james.kent@development.vertic.com.au
export SFDC_DEV_PASSWORD=qwerty
export SFDC_DEV_TOKEN=qwertySKDs6ywb8XwCxutO
export SFDC_DEV_OAUTH_CLIENTID=qwertyuL0ppGP5UrAp2lygTnOt9ZS2jylYIrybVQ3253StPRH56CQds04pzLyzlMNVmKHVXUcLAdUap_MhSIXe
export SFDC_DEV_OAUTH_SECRETID=q12w3e4r790270708891
```
