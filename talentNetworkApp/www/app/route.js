(function(app){

    app.config(config);

    config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$ocLazyLoadProvider'];

    function config($stateProvider, $urlRouterProvider, $httpProvider, $ocLazyLoadProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    //  $ionic.Platform.onHardwareBackButton(function(){ console.log("back button pressed");});

    // $ionicNativeTransitionsProvider.setDefaultOptions({
    //     duration: 400, // in milliseconds (ms), default 400,
    //     slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
    //     iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
    //     androiddelay: -1, // same as above but for Android, default -1
    //     winphonedelay: -1, // same as above but for Windows Phone, default -1,
    //     fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
    //     fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    //     triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
    //     backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
    // });
    
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.timeout = 50000;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


    $stateProvider

        

        //------------------------ Change password ---------------------------------------
        .state('changePassword',{
             url: '/changePassword',
             cache:false,
            templateUrl: 'app/modules/account/templates/changePassword.html',

            controller: 'changePasswordCtrl',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                        'app/modules/shared/messages.js',
                        'app/modules/account/controllers/changepasswordController.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/account/services/accountService.js',
                        'app/modules/account/services/localStorage.js'

                        ]
                    });
                }]
            }
        })

        //------------------------ forgot password ---------------------------------------
        .state('forgotPasswordRoot',{
            parent:'rootSignup',
            abstract:true,
            templateUrl: ''
        })
        .state('forgotPassword', {
            parent: 'rootSignup',
             cache:false,
            url: '/forgotPassword',
            templateUrl: 'app/modules/account/templates/forgotPassword.html',
            controller: 'forgotPasswordCtrl',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                                    'app/modules/shared/messages.js',
                                    'app/modules/account/controllers/forgotPasswordController.js',
                                    'app/modules/account/services/accountService.js',
                                    'app/modules/shared/responseCodeHandlingService.js'
                        ]
                    });
                }]
            }
        })
         .state('resendVerificationEmail', {
            parent: 'rootSignup',
            cache:false,
            url: '/resendVerificationEmail',
            templateUrl: 'app/modules/account/templates/resendMail.html',
            controller: 'resendMailCtrl',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                                    'app/modules/shared/messages.js',
                                    'app/modules/account/controllers/resendMailController.js',
                                    'app/modules/account/services/accountService.js',
                                    'app/modules/shared/responseCodeHandlingService.js'
                        ]
                    });
                }]
            }
        }).
        state('forgotPasswordComplete',{
            parent: 'rootSignup',
             cache:false,
            url: '/forgotPasswordComplete',
            templateUrl: 'app/modules/account/templates/forgotPasswordComplete.html'
        })


        //------------------------ Sign up ---------------------------------------
        .state('rootSignup', {
            abstract: true,
             cache:false,
            templateUrl: '',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                          'app/modules/shared/messages.js',
                          'app/modules/account/controllers/signupController.js',
                          'app/modules/shared/services/actionSheetService.js',
                          'app/modules/shared/directives/keyboardHandlingDirective.js',
                          'app/modules/account/services/accountService.js',
                          'app/modules/shared/responseCodeHandlingService.js'
                        ]
                    });
                }]
            }
        })
        .state('signUp', {
            parent: 'rootSignup',
            url: '/signUp',
             cache:false,
            templateUrl: 'app/modules/account/templates/signUp.html',
            controller: 'signupCtrl',
            params: {
                userData: null
            }
        })

        .state('login', {
           parent:'rootSignup',
            url: '/login',
            cache:false,
            templateUrl: 'app/modules/account/templates/login.html',
            controller: 'loginCtrl',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                        'app/modules/shared/messages.js',
                        'app/modules/account/controllers/loginController.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/account/services/accountService.js'

                        ]
                    });
                }]
            }
        })

        .state('signupChooseRole', {

            parent: 'rootSignup',
            url: '/signupChooseRole',
             cache:false,
            templateUrl: 'app/modules/account/templates/signupChooseRole.html',
            controller: 'signupCtrl',
            params: {
                userData: null
            }
        })
        .state('signupCategory', {
            parent: 'rootSignup',
            url: '/signupCategory',
             cache:false,
            templateUrl: 'app/modules/account/templates/signupCategory.html',
            controller: 'signupCtrl',
            params: {
                userData: null
            }
        })
        .state('signupGroup', {
            parent: 'rootSignup',
            url: '/signupGroup',
             cache:false,
            templateUrl: 'app/modules/account/templates/signupGroup.html',
            controller: 'signupCtrl',
            params: {
                userData: null
            }
        })

        .state('signupComplete', {
            parent: 'rootSignup',
            url: '/signupComplete',
             cache:false,
            templateUrl: 'app/modules/account/templates/signupComplete.html',
            controller: 'signupCtrl',
            params: {
                userData: null
            }
        })
    
    //------------------------ Side menu ---------------------------------------

    .state('side-menu', {
       
        cache: false,
        templateUrl: 'app/modules/shared/templates/side-menu.html',
        controller: 'parentCtrl',
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                            'app/modules/shared/messages.js',
                            'app/modules/shared/controllers/parentController.js',
                            'app/modules/home/services/homeServices.js',
                            'app/modules/category/services/categoryService.js',
                            'app/modules/shared/responseCodeHandlingService.js'
                    ]
                });
            }]
        }
    })
  

    .state('home', {
        parent:'side-menu',
        url: '/home',
        cache:false,
        views: {
            'menuContent': {
                templateUrl: 'app/modules/home/templates/home.html',
                controller: 'homeCtrl'
            }
        },
        resolve: {
            map: ['$ocLazyLoad', '$rootScope', 'localStorage', function ($ocLazyLoad, $rootScope, localStorage) {
                // var isUserCelebrity = localStorage.get('role') === '4';

                // console.log('isUserCelebrity:: ' + isUserCelebrity);

                // if (!isUserCelebrity) {
                //     return $ocLazyLoad.load([{
                //         files: [
                //                     'app/modules/home/controllers/homeController.js',
                //                     'app/modules/home/services/homeServices.js',
                //                     'app/modules/shared/directives/postDirective.js',
                //                     'app/modules/shared/directives/webLinkDirective.js',
                //                     'app/modules/shared/services/postService.js',
                //                     'app/modules/shared/services/actionSheetService.js',
                //         ],
                //         cache: true
                //     }, {
                //         files: ['css/ionicuser.app.min.css'],
                //         cache: false
                //     }]);
                // } else {
                    return $ocLazyLoad.load([{
                        files: [
                                    'app/modules/shared/messages.js',
                                    'app/modules/home/controllers/homeController.js',
                                    'app/modules/home/services/homeServices.js',
                                    'app/modules/shared/services/sharedService.js',
                                    'app/modules/shared/directives/postDirective.js',
                                    'app/modules/shared/directives/webLinkDirective.js',
                                    'app/modules/shared/services/postService.js',
                                    'app/modules/shared/services/actionSheetService.js',
                                    'app/modules/shared/directives/videoThumbnail.js',
                                    'app/modules/shared/directives/iframeOnLoadDirective.js',
                                    'app/modules/shared/directives/soundCardDirective.js'
                                
                        ],
                        cache: true
                    }]);
                // }
            }]
        }
    })
    

    .state('category', {
      parent:'side-menu',
        url: '/category/:id',
       cache:false,
      
        views: {
            'menuContent': {
                templateUrl: 'app/modules/category/templates/categories.html',
                controller: 'categoryCtrl',
            }
        },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                                'app/modules/shared/messages.js',
                                'app/modules/celebrity/services/celebrityService.js',
                                'app/modules/category/controllers/categoryController.js',
                                'app/modules/category/services/categoryService.js',
                                'app/modules/shared/responseCodeHandlingService.js',
                                'app/modules/shared/directives/categoryDirective.js',
                                'app/modules/shared/directives/webLinkDirective.js',
                                'app/modules/shared/directives/iframeOnLoadDirective.js',
                                'app/modules/shared/directives/soundCardDirective.js'
                             
                    ],
                });
            }]
        }
    })
   //---------------------------------------- Celeb List ---------------------------------------
    .state('celebsList', {
        parent: 'side-menu',
         cache:false,
        url: '/celebsList',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/celebrity/templates/celebsList.html',
                controller: 'celebList'
            }
        },
        resolve:{
            map:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/shared/messages.js',
                        'app/modules/celebrity/controllers/celebListController.js',
                        'app/modules/celebrity/services/celebrityService.js',
                        'app/modules/shared/controllers/userProfileController.js',
                    ]
                })
            }]
        }
    })
       .state('postDescription', {
        parent: 'side-menu',
         cache:false,
        url: '/postDescription/:media_id',
        
        views: {
            'menuContent': {
                templateUrl: 'app/modules/shared/templates/postDescription.html',
                controller: 'postCtrl'
                
                           }
             },
              resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                                'app/modules/shared/messages.js',
                                'app/modules/shared/controllers/postDescription.js',
                                 'app/modules/shared/services/sharedService.js',
                                'app/modules/shared/responseCodeHandlingService.js',
                                'app/modules/shared/directives/iframeOnLoadDirective.js',
                                'app/modules/shared/directives/soundCardDirective.js'
                           ]
                });
            }]
        },
        params:{
            data:null
        }
    })
       
       .state('post-video', {
        parent: 'side-menu',
         cache:false,
        url: '/post-video',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/shared/templates/post-video.html',
                
            }
        }
    })
       .state('haveAnIdea', {
        parent: 'side-menu',
        cache:false,
        url: '/haveAnIdea',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/shared/templates/haveAnIdea.html',
                 controller: 'ideaCtrl'
            }
        },
         resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                          'app/modules/shared/messages.js',
                          'app/modules/shared/controllers/haveAnIdea.js',
                          'app/modules/home/services/homeServices.js',
                          'app/modules/shared/services/actionSheetService.js',
                          'app/modules/shared/responseCodeHandlingService.js',
                          'app/modules/shared/services/sharedService.js',

                          
                          
                        ]
                    });
                }]
            }
    })
       .state('setting', {
        parent: 'side-menu',
         cache:false,
        url: '/setting',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/shared/templates/setting.html',
                
            }
        }
    })


    //-----------------------------Production House List ---------------------------------------
    .state('productionHouseList', {
        parent: 'side-menu',
         cache:false,
        url: '/productionHouse',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/productionHouse/templates/productionHouseList.html',
                controller: 'productionHouse'
            }
        },
        resolve:{
            map:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/productionHouse/services/productionHouseService.js',
                        'app/modules/productionHouse/controllers/productionHouseController.js',
                        'app/modules/shared/controllers/userProfileController.js',
                    ]
                })
            }]
        }
    })

    //------------------------ About Us ---------------------------------------

    .state('aboutUs', {
        parent: 'side-menu',
        url: '/aboutUs',
         cache:false,
        views: {
            'menuContent': {
                templateUrl: 'app/modules/about/templates/aboutUs.html',
                controller: 'aboutCtrl',
            }
        },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/about/controllers/aboutController.js',
                    'app/modules/shared/responseCodeHandlingService.js',
                    'app/modules/shared/messages.js',
                    'app/modules/about/services/aboutServices.js'
                    ]
                });
            }]
        }
    })
        //------------------------ Contact Us ---------------------------------------

    .state('contactUs', {
        parent: 'side-menu',
        url: '/contactUs',
         cache:false,
        views: {
            'menuContent': {
                templateUrl: 'app/modules/contact/templates/contactUs.html',
                controller: 'contactCtrl',
            }
        },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/contact/controllers/contactController.js',
                    'app/modules/shared/responseCodeHandlingService.js',
                    'app/modules/shared/messages.js',
                    'app/modules/contact/services/contactServices.js'
                    ]
                });
            }]
        }
    })
        //------------------------ Users ---------------------------------------

    .state('users', {
        parent: 'side-menu',
        url: '/users',
         cache:false,
        views: {
            'menuContent': {
                templateUrl: 'app/modules/user/templates/userContact.html',
                controller: 'userCtrl',
            }
        },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/user/controllers/userController.js',
                    'app/modules/shared/responseCodeHandlingService.js',
                    'app/modules/shared/messages.js',
                    'app/modules/user/services/userService.js'
                    ]
                });
            }]
        }
    })
        //------------------------Celebrity Invite  ---------------------------------------
        .state('celebrityInvite', {
            parent: 'side-menu',
            url: '/celebrityInvite',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/modules/celebrity/templates/celebrityInvite.html',
                    controller: 'celebInviteCtrl',
                }
            },
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                         'app/modules/shared/messages.js',
                        'app/modules/celebrity/controllers/celebInviteController.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/celebrity/services/celebrityService.js'
                        ]
                    });
                }]
            }
        })

      .state('celebrityInviteComplete',{
        parent:'side-menu',
        url:'/celebrityInviteComplete',
        cache:false,
        views:{
          'menuContent':{
            templateUrl: 'app/modules/celebrity/templates/celebrityInviteComplete.html'
          }
        }
      })

     .state('celebrityEvents', {
        url: '/celebrityEvents',
        parent: 'side-menu',
        cache: false,
        views: {
                'menuContent': {
                    templateUrl: 'app/modules/celebrity/templates/celebrityEventsList.html',
                    controller: 'eventCtrl',
                }
            },
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                        'app/modules/shared/messages.js',
                        'app/modules/shared/services/actionSheetService.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/celebrity/controllers/eventController.js',
                        'app/modules/celebrity/services/eventService.js'

                        ]
                    });
                }]
            }

    })
     .state('eventDescription', {

        parent:'side-menu',
        url: '/eventDescriptions/:event_id',
            parent: 'side-menu',
            cache: false,
            views: {
                'menuContent': {
                    templateUrl: 'app/modules/celebrity/templates/eventDescription.html',
                    controller: 'eventCtrl'
                }
            },
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                        'app/modules/shared/messages.js',
                        'app/modules/shared/directives/webLinkDirective.js',
                         'app/modules/shared/services/actionSheetService.js',
                        'app/modules/celebrity/services/celebrityService.js',
                        'app/modules/celebrity/controllers/eventController.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/celebrity/services/eventService.js',
                        'app/modules/shared/services/sharedService.js',
                        ]
                    });
                }]
            }
        })

     .state('newTalent',{
        parent: 'side-menu',
        url:'/newTalent/:id',
         cache:false,
        views:{
            'menuContent':{
                templateUrl: 'app/modules/celebrity/templates/newTalenttpl.html',
                controller: 'newTalentCtrl'
            }
        },
        resolve:{
             map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                        'app/modules/shared/messages.js',
                        'app/modules/shared/directives/webLinkDirective.js',
                        'app/modules/celebrity/services/celebrityService.js',
                        'app/modules/shared/responseCodeHandlingService.js',
                        'app/modules/celebrity/services/eventService.js',
                        'app/modules/profile/services/viewprofileService.js',
                        'app/modules/celebrity/controllers/newTalentController.js'
                        ]
                    });
                }]
        }
     })

    // .state('celebrityEvents', {
    //     url: '/celebrityEvents',
    //     templateUrl: 'templates/celebrityEvents.html',
    // })
   
    //------------------------ createEvent ---------------------------------------
     .state('createEvent', {
        parent:'side-menu',
        url: '/createEvent',
        cache:'false',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/celebrity/templates/createEvent.html',
                 controller: 'createEventCtrl'
            }
        },
         resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                          'app/modules/shared/messages.js',
                          'app/modules/celebrity/controllers/createEventController.js',
                          'app/modules/celebrity/services/celebrityService.js',
                          'app/modules/shared/services/actionSheetService.js',
                          'app/modules/shared/responseCodeHandlingService.js',
                          'app/modules/shared/services/sharedService.js',

                          
                          
                        ]
                    });
                }]
            }
    })

    //------------------------ user contact ---------------------------------------
    .state('userContact', {
        parent: 'side-menu',
         cache:false,
        url: '/userList',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/user/templates/userContact.html'
            }
        }
    })

    //------------------------ My fan ---------------------------------------
    .state('myFan', {
        parent: 'side-menu',
         cache:false,
        url: '/myFan',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/myFan/templates/myFan.html',
                controller: 'myfan',
            }
        },
         resolve:{
            map:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/shared/messages.js',
                        'app/modules/myFan/controllers/myFanController.js',
                        'app/modules/myFan/services/myfanServices.js',
                        'app/modules/shared/services/sharedService.js'
                        
                    ]
                })
            }]
        }
    })

//--------------------------------Fanof-------------------------------------------------------
     .state('fanof', {
        parent: 'side-menu',
         cache:false,
        url: '/fanof',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/fanof/templates/fanof.html',
                controller: 'fanof',
            }
        },
         resolve:{
            map:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/fanof/controllers/fanofController.js',
                        'app/modules/fanof/services/fanofServices.js',
                        'app/modules/shared/services/sharedService.js'
                        
                    ]
                })
            }]
        }
    })



//-----------------   Who View My Profile ---------------------------//
.state('whoviewprofile', {
        parent: 'side-menu',
         cache:false,
        url: '/whoViewMyProfile',
        views: {
            'menuContent': {
                templateUrl: 'app/modules/profile/templates/whoViewProfile.html',
                controller: 'ViewProfile',
            }
        },
         resolve:{
            map:['$ocLazyLoad',function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/profile/controllers/ViewProfileController.js',
                        'app/modules/shared/messages.js',
                        'app/modules/profile/services/viewprofileService.js'
                        
                    ]
                })
            }]
        }
    })
    //------------------------ Profile ---------------------------------------
    .state('profile', {
      parent:'side-menu',
       cache:false,
      url: '/profile',
      views:{
        'menuContent':{
          templateUrl: 'app/modules/profile/templates/profile.html',
          controller: 'profileCtrl',
        }
      },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/shared/messages.js',
                    'app/modules/shared/services/actionSheetService.js',
                    'app/modules/profile/controllers/profileController.js',
                    'app/modules/profile/services/profileService.js',
                    'app/modules/shared/services/postService.js',
                    'app/modules/shared/directives/postDirective.js',
                    'app/modules/shared/directives/iframeOnLoadDirective.js',
                     'app/modules/shared/directives/videoThumbnail.js',
                    'app/modules/shared/directives/webLinkDirective.js',
                    'app/modules/shared/directives/soundCardDirective.js'
                    ]
                });
            }]
        }
    })

    .state('userProfile',{
        parent: 'side-menu',
         cache:false,
        url: '/userProfile/:id',
        views:{
            menuContent:{
                templateUrl:'app/modules/shared/templates/userDescription.html',
                controller: 'userProfileCtrl'
            }
        },
        resolve: {
            map: ['$ocLazyLoad', function($ocLazyLoad){
                return $ocLazyLoad.load({
                    files:[
                        'app/modules/shared/messages.js',
                        'app/modules/shared/services/actionSheetService.js',
                        'app/modules/shared/services/sharedService.js',
                        'app/modules/shared/controllers/userProfileController.js',
                        'app/modules/shared/directives/postDirective.js',
                        'app/modules/shared/directives/videoThumbnail.js',
                        'app/modules/shared/directives/webLinkDirective.js',
                        'app/modules/shared/directives/soundCardDirective.js'
                    ]
                })
            }]
        }

    })

 

    //------------------------ search ---------------------------------------
    .state('search', {
        parent:'side-menu',
         cache:false,
      url: '/search',
      views:{
        'menuContent':{
          templateUrl: 'app/modules/search/templates/search.html',
          controller: 'searchCtrl',
        }
      },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/shared/services/postService.js',
                    'app/modules/shared/directives/iframeOnLoadDirective.js',
                     // 'app/modules/shared/directives/autoFocusDirective.js',
                    'app/modules/shared/directives/searchDirective.js',
                    'app/modules/shared/directives/postDirective.js',
                    'app/modules/search/controllers/searchController.js',
                    'app/modules/search/services/searchService.js',
                    
               
    ]
                });
            }]
        }
       
       
    }).state('notificationsList', {
        parent:'side-menu',
         cache:false,
      url: '/notificationsList',
      views:{
        'menuContent':{
          templateUrl: 'app/modules/shared/templates/notificationList.html',
          controller: 'notificationListCtrl',
        }
      },
        resolve: {
            map: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                    'app/modules/shared/controllers/notificationController.js',
                    'app/modules/home/services/homeServices.js',
                    
                    

                   
                   
    ]
                });
            }]
        }
       
       
    });
    
  //  $urlRouterProvider.otherwise('/login');


  $urlRouterProvider.otherwise(function($injector) {

      var sessionId = $injector.get('localStorage').get('sessionId');
      var role= $injector.get('localStorage').get('role');
        if (sessionId) {
              $injector.get('$state').go('home');
                if (role === '3' || role === '5') {
                     var d = document.getElementsByTagName("body");
                      d[0].className += " userTheme";
                    } else {
                      
                      var d = document.getElementsByTagName("body");
                      d[0].className = d[0].className.replace(" userTheme", "");
                    }
                    


      }else{
            var d = document.getElementsByTagName("body");
            console.log(d);
             d[0].className = d[0].className.replace(" userTheme", ""); 
              $injector.get('$state').go('login');

            }

    });
}

})(angular.module('talentNetworkApp'));
