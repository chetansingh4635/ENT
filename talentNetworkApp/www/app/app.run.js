
(function(app){
  app.run(run);

  run.$inject = ['$ionicPlatform', '$rootScope',  '$http', '$state', 'Config', 'localStorage','$ionicPopup','$cordovaToast','$cordovaSplashscreen','$timeout','$ionicModal'];

  function run($ionicPlatform, $rootScope,  $http, $state, Config, localStorage,$ionicPopup,$cordovaToast, $cordovaSplashscreen, $timeout,$ionicModal) {
  $ionicPlatform.ready(function() {
          ionic.Platform.fullScreen();
    if (window.StatusBar) {
      StatusBar.hide();
    }
    ionic.Platform.fullScreen();

    // setting up the deep linking
          // Branch.setDebug(true);

          // // sync with Mixpanel if installed
          // Branch.setMixpanelToken('your_mixpanel_token');

          // // Branch initialization
          // Branch.initSession(function(data) {
          //   // read deep link data on click
          //   console.log( JSON.stringify(data)); 
          // }).then(function(res) {
          //   console.log(JSON.stringify(res));
          // }).catch(function(err) {
          //   console.log(JSON.stringify(err));
          // });

    //------------------------------------------------------------------------------------------     
    $rootScope.imageLazyLoadSpinner = ionic.Platform.isIOS() ? 'ios' : ionic.Platform.isAndroid() ? 'android' : 'spiral';
    if(window.cordova && window.cordova.plugins.Keyboard) {
               if (window.StatusBar) {
                   StatusBar.hide();
                 }
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (ionic.Platform.isAndroid()) {
      window.addEventListener("native.showkeyboard", function () { 
         StatusBar.hide();
       
           });
         window.addEventListener("native.hidekeyboard", function () { 
         StatusBar.hide();
         ionic.Platform.fullScreen();
         
           });
       }
    
    
    setTimeout(function(){navigator.splashscreen.hide();},1000);
  });

             

    var firstTapForHome=false;
    var secondTapForHome=false;
    var firstTapForLogin=false;
    var secondTapForLogin=false;
    
  function init(){
      firstTapForHome=false;
      secondTapForHome=false;
      firstTapForLogin=false;
      secondTapForLogin=false;
  }
  
    $rootScope.$on('$stateChangeStart', function(event, toState, toParms, fromState) {
            init();
      		var sessionId = localStorage.get('sessionId');


            if (!sessionId && (toState.name != 'login' && toState.parent != 'rootSignup' && toState.parent != 'forgotPasswordRoot')) {
                event.preventDefault();
                $state.go('login');
            } else if (toState.name != 'login') {

                $http.defaults.headers.common['session-id'] = sessionId;

                }

                $http.defaults.headers.common['Content-type'] = 'application/json';
                $http.defaults.headers.common['api-key'] = Config.apiKey;
  });

          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
             $ionicPopup.alert({
                  title: 'No Internet Connection',
                  content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
               }).then(function(res) {
                    console.log("res of Internet connection",res);
             });
        });
        $ionicPlatform.registerBackButtonAction(function(event) {
              if($ionicModal.isShown)
                $ionicModal.remove();
              switch ($state.current.name){
                    case 'login':
                          if(firstTapForLogin){
                              secondTapForLogin=true;
                          }else{
                            firstTapForLogin=true;
                            $timeout(function(){
                             firstTapForLogin=false;
                            }, 2000);
                              
                            }
                        if(firstTapForLogin && secondTapForLogin){
                            ionic.Platform.exitApp();
                            firstTapForLogin=false;
                            secondTapForLogin=false;
                        }else{

                              $cordovaToast.show("Press again back to exit from app","short","bottom");
                          }
                       
                              break;
                    case 'signup':
                                   navigator.app.backHistory();// $state.go('login');
                                   break;
                    case 'signupChooseRole':
                    case 'postDescription':
                                   navigator.app.backHistory();// $state.go('signUp',{reload:true});
                                   break;
                     case 'profile':
                                   navigator.app.backHistory();// $state.go('signUp',{reload:true});
                                   break; 
                     case 'userProfile':
                                   navigator.app.backHistory();// $state.go('signUp',{reload:true});
                                   break;             
                    case 'signupCategory':
                                   navigator.app.backHistory();// $state.go('signUp',{reload:true});
                                   break;
                    case 'celebsList': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'aboutUs': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'contactUs': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'users': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'celebrityInvite':
                    case 'celebrityInviteComplete':
                    case 'celebrityEvents': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'userContact': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                    case 'myFan': navigator.app.backHistory();//$state.go('home',{reload:true});
                           break;
                   case 'category': navigator.app.backHistory();//$state.go('home',{reload:true});
                                    break;
                    case 'changePassword':
                              navigator.app.backHistory();//  $state.go('home',{reload:true});
                                   break;
                    case 'profile':
                           navigator.app.backHistory();//$state.go('home');
                           break;
                    case 'notificationsList':
                          navigator.app.backHistory();// $state.go('home');
                           break;
                    case 'productionHouseList':
                           navigator.app.backHistory();//$state.go('home');
                           break;    
                    case 'changePassword':
                          navigator.app.backHistory();// $state.go('home');
                           break;   
                    case 'home':
                        
                       
                      if(firstTapForHome && !$rootScope.checkUpload ){
                        secondTapForHome=true;
                      }else{

                           firstTapForHome=true;
                           $timeout(function(){
                              firstTapForHome=false;
                            }, 2000);
                              
                     }
                    if(firstTapForHome && secondTapForHome){
                        navigator.app.exitApp();
                        //  ionic.Platform.exitApp();
                        firstTapForHome=false;
                        secondTapForHome=false;
                    }else{
                         if($rootScope.checkUpload==true)
                        {
                           navigator.app.backHistory();//ootScope.checkUpload=false;
                         $state.go($state.current, {}, {reload: true}); 
                        }
                        else
                          $cordovaToast.show("Press again back to exit from app","short","bottom");
                      }
                  
                          break;
                    default:
                          navigator.app.backHistory();
                  }

            }, 100);

}

app.config(config);

config.$inject = ['$httpProvider','$ionicConfigProvider'];

function config($httpProvider, $ionicConfigProvider){

  $httpProvider.defaults.useXDomain = true;
  // $ionicConfigProvider.views.swipeBackEnabled(false);
  // $ionicConfigProvider.scrolling.jsScrolling(false);

  delete $httpProvider.defaults.headers.common['X-Requested-With'];

 $httpProvider.interceptors.push('authInterceptor');

}
})(angular.module('talentNetworkApp'));
