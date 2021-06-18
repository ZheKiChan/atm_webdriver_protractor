// conf.js
let SpecReporter = require('jasmine-spec-reporter').SpecReporter

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*.spec.js'],
    capabilities: {
        browserName: 'chrome',
        maxInstances: 1
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 10000
    },
    onPrepare: function() {
        jasmine.getEnv().addReporter(
            new SpecReporter({
                spec: {
                    displayStacktrace: true,
                },
            })
        )
    }
}