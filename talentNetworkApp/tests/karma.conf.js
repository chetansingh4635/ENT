// Karma configuration
// Generated on Fri Aug 19 2016 10:22:51 GMT+0530 (India Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
	
                // loads our modules for tests
              "../www/lib/ionic/js/ionic.bundle.js",
             "../www/cordova.js",
             "../www/lib/angular-mocks/angular-mocks.js",
             "../www/lib/angular-resource/angular-resource.min.js",
             "../www/lib/oclazyload/dist/ocLazyLoad.js",
             "../www/lib/angular-local-storage/dist/angular-local-storage.min.js",
             "../www/lib/ngCordova/dist/ng-cordova.js",
             "../www/lib/angular-google-maps/dist/angular-google-maps.js",
             "../www/app/app.js",
	           "../www/lib/ionic/js/ionic.bundle.js",
             "../www/lib/ngCordova/dist/ng-cordova.js",
          
             "../www/lib/oclazyload/dist/ocLazyLoad.min.js",
             "../www/lib/moment/moment.js",

              "../www/lib/angular-simple-logger/dist/angular-simple-logger.min.js",
              "../www/lib/angular-google-places-autocomplete/dist/autocomplete.min.js",
              "../www/lib/ngmap/build/scripts/ng-map.min.js",
              "../www/lib/ionic-ratings/dist/ionic-ratings.min.js",
              "../www/lib/moment/moment.js",
              "../www/lib/ngMask/dist/ngMask.js",
               "../www/lib/angular-local-storage/dist/angular-local-storage.min.js",
              "../www/lib/ion-md-input/ion-md-input.js",
              "../www/lib/moment/moment.js",
          
             
             "../www/app/modules/shared/services/localStorage.js",
             "../www/js/filters/customFilters.js",
             "../www/app/modules/shared/messages.js",
             "../www/lib/angular-resource/angular-resource.min.js",
             "../www/lib/angular-password/angular-password.min.js",
            "../www/app/config.js",
            "../www/app/route.js",
            "../www/app/app.run.js",
             "testStore.js",    
             "requestTestStore.js",   
		        "../www/app/modules/account/controllers/loginController.js",
            "../www/app/modules/account/services/accountService.js",
            "../www/app/modules/account/services/localStorage.js",
            "../www/app/modules/account/controllers/signupController.js",
            "../www/app/modules/home/controllers/homeController.js",
            "../www/app/modules/home/services/homeServices.js",
            "../www/app/modules/about/controllers/aboutController.js",
      	    
            "../www/app/modules/about/services/aboutServices.js",
            "../www/app/modules/contact/services/contactServices.js",
            "../www/app/modules/contact/controllers/contactController.js",
            "../www/app/modules/profile/controllers/profileController.js",
            "../www/app/modules/celebrity/controllers/celebInviteController.js",
            "../www/app/modules/celebrity/controllers/celebListController.js",
            "../www/app/modules/celebrity/services/celebrityService.js",
    	       "../www/app/modules/shared/services/loaderService.js",
             "../www/app/modules/shared/responseCodeHandlingService.js",
    	        // "./test/teststore.js",
    	       "./test/login.spec.js",
    		    "./test/Home.spec.js",
            "./test/signup.spec.js",
            "./test/about.spec.js",
            "./test/contact.spec.js",
            "./test/profile.spec.js",
            "./test/Celebinvite.spec.js",
             "./test/Celeblist.spec.js",
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors :{
          "../www/app/modules/account/controllers/loginController.js":['coverage'],
          "../www/app/modules/account/controllers/signupController.js":['coverage'],
          "../www/app/modules/account/services/accountService.js":['coverage'],
          "../www/app/modules/home/controllers/homeController.js":['coverage'],
          "../www/app/modules/home/services/homeServices.js":['coverage'],
          "../www/app/modules/about/controllers/aboutController.js":['coverage'],
          "../www/app/modules/about/servicess/aboutServices.js":['coverage'],
          "../www/app/modules/contact/controllers/contactController.js":['coverage'],
           "../www/app/modules/contact/services/contactServices.js":['coverage'],
           "../www/app/modules/profile/controllers/profileController.js":['coverage'],
           "../www/app/modules/celebrity/controllers/celebInviteController.js":['coverage'],
           "../www/app/modules/celebrity/controllers/celebListController.js":['coverage'],
          "../www/app/modules/celebrity/services/celebrityService.js":['coverage'],

              },

	  reporters: ['progress','coverage'],



    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
	coverageReporter:{
        //specify a common output directory
        dir:'../build/reports/coverage',
        reporters:[
        //reporters not supporting the `file` property
        {
            type:'html',
            subdir: 'report-html'
        },
        //reporters supporting the file property use subdir to directly
        //output them in the dir directory
        {
            type:'text',
            subdir:'.',
            file:'text.txt'
        },{
            type:'text-summary',
            subdir:'.',
            file:'text-summary.txt'
        },
    ]
},
plugins: [
  'karma-jasmine',
  'karma-coverage',
  'karma-chrome-launcher',
  
  
],
	

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
