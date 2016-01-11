"use strict";

var fs = require('fs'),
	gutil = require('gulp-util');

// ----------------------------------------------------------------

var logResults = function(res) {

	gutil.log('');
	gutil.log('----------------------------------------------');
	gutil.log('DEPLOYMENT RESULTS', ' ( id:', gutil.colors.cyan(res.id), ')');
	gutil.log('----------------------------------------------');
	gutil.log('Started On          ', gutil.colors.magenta(res.startDate));
	gutil.log('Completed On        ', gutil.colors.magenta(res.completedDate));
	gutil.log('Executed By         ', gutil.colors.magenta(res.createdByName));
	gutil.log('Status              ', gutil.colors.magenta(res.status));

	gutil.log('');

	//gutil.log(res.details);

	if (res.numberComponentsTotal > 0) {

		gutil.log('');
		gutil.log('Component Deployment Results');
		gutil.log('----------------------------');
		gutil.log('');

		gutil.log('Component Errors    ', gutil.colors.magenta(res.numberComponentErrors));
		gutil.log('Components Deployed ', gutil.colors.magenta(res.numberComponentsDeployed));
		gutil.log('Total Components    ', gutil.colors.magenta(res.numberComponentsTotal));

		if (res.details.componentFailures !== undefined) {
			res.details.componentFailures.forEach(function(item) {
				gutil.log('');
				gutil.log('Object', gutil.colors.cyan(item.fullName + ' (Type: ' + item.componentType + ')'));
				gutil.log('Filename', gutil.colors.magenta(item.fileName));
				gutil.log('Problem', gutil.colors.magenta('(' + item.problemType + ')'), gutil.colors.magenta(item.problem));
			});
		}
	}

	if (res.numberTestsTotal > 0 && res.details.runTestResult !== undefined) {

		var testResults = res.details.runTestResult;

		gutil.log('');
		gutil.log('Test Results');
		gutil.log('------------');
		gutil.log('');

		if (testResults.codeCoverageWarnings !== undefined) {
			gutil.log(gutil.colors.red(testResults.codeCoverageWarnings[0].message));
			gutil.log('');
		}

		gutil.log('Test Errors         ', (res.numberTestErrors === 0) ? gutil.colors.magenta(res.numberTestErrors) : gutil.colors.red(res.numberTestErrors));
		gutil.log('Tests Completed     ', gutil.colors.magenta(res.numberTestsCompleted));
		gutil.log('Total Tests         ', gutil.colors.magenta(res.numberTestsTotal));

		if (testResults.failures !== undefined) {
			testResults.failures.forEach(function(item) {
				gutil.log('');
				gutil.log('Test method', gutil.colors.cyan(item.name + '.' + item.methodName));
				gutil.log('Message', gutil.colors.magenta(item.message));
				gutil.log('Stack trace', gutil.colors.magenta(item.stackTrace));
			});
		}

	}

	gutil.log('');

};

var deployAndPoll = function(org, salesforcePackageFile, deployOptions) {

	return org
		.authenticate()
		.then(function(oauth) {

			gutil.log('Package location', gutil.colors.magenta(salesforcePackageFile));
		    var archive = fs.readFileSync(salesforcePackageFile);

			gutil.log('');
			gutil.log('Commencing deployment');

			var promise = org.meta.deployAndPoll({
				oauth: oauth,
			    zipFile: archive,
			    includeDetails: true,
			    deployOptions: deployOptions
			  });

			promise.poller.on('poll', function(res) {
				gutil.log('Status', gutil.colors.magenta(res.status));
			});

			return promise;

		}).then(function(res) {

			logResults(res);
				
			if (res.numberTestErrors > 0)
				throw new gutil.PluginError('nforce-deploy-test', res.numberTestErrors + ' test(s) failed.\n', { showProperties: false, showStack: false });

		}).error(function(res) {
			console.error(res);
			
			logResults(res);

			throw new gutil.PluginError('nforce-deploy-test', 'An error occurred.', { showProperties: false, showStack: false });
		});

};

module.exports = {

	executeAllTests: function(org, salesforcePackageFile) {
		return deployAndPoll(org, salesforcePackageFile, {
	    	checkOnly: true,
	    	runAllTests: true
	    });
	},

	deploy: function(org, salesforcePackageFile) {
		return deployAndPoll(org, salesforcePackageFile, {});
	}

};