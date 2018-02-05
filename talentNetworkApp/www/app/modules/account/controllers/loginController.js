(function (app) {
    app.controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$rootScope','$scope', '$state','accountService','localStorage','responseCodeHandling','loader','$q','$cordovaSplashscreen','$ionicHistory','$cordovaToast', 'messages'];

    function loginCtrl($rootScope,$scope,$state,accountService,localStorage,responseCodeHandling,loader,$q,$cordovaSplashscreen,$ionicHistory,$cordovaToast, messages) {

        var d = document.getElementsByTagName("body");
        d[0].className = d[0].className.replace(" userTheme", ""); 

        $scope.loginObject={};
        $scope.form={};
        var fbSignupObject = {}
        /*
         * loader is used to indicate activity while blocking user interaction.
         */
       

        $scope.moveToForgotPassword = function () {
  
            $state.go('forgotPassword');
        }

        $scope.moveToRegister = function() {
            $state.go('signUp', { reload: true });
        }

        function loginSuccess(response) {
           loader.hide();
           
           responseCodeHandling.showMessages(response.code,messages.login.loginSuccess,true,function(status,msg){
           if(status){
                $ionicHistory.clearHistory();
                localStorage.set("activeUser",response.data.email);
                localStorage.set("role",response.data.role);
                if(response.data.admin_verified=='0')
                localStorage.set("admin_verified",false);
                else
                localStorage.set("admin_verified",true);
                
                localStorage.set("sessionId",response.data.session_id);
                if (response.data.role == '3' || response.data.role == '5') {
                     var d = document.getElementsByTagName("body");
                      d[0].className +=" userTheme";
                    } else {
                      var d = document.getElementsByTagName("body");
                      d[0].className = d[0].className.replace(" userTheme", "");
                    }
                    
                    $state.go('home');

            }else{}
         });

        }

        function loginError(err) {
            loader.hide();
           
        }

        //Normal login
         $scope.login = function(isLoginFormValid) {
          loader.show();
           if(!isLoginFormValid){

                return;
           }
           if(window.plugins){
              cordova.plugins.Keyboard.close();
           }
            var dataToSend = {
                email : $scope.loginObject.email,
                password : $scope.loginObject.password
            };
            
            accountService.login(null, dataToSend, loginSuccess, loginError);
        };

        // facebook login goig on
        /* Getting face book profile info*/
        var getFacebookProfileInfo = function(authResponse) {
              var info = $q.defer();
              facebookConnectPlugin.api('/me?fields=email,first_name,last_name&access_token=' + authResponse.accessToken, null,
                function(response) {
                  /**Responce object will contain
                  *email
                  *first_name
                  *Last Name
                  *id
                  */
                  info.resolve(response);
                },
                function(error) {
                  info.reject(error);
                });
              return info.promise;
            };

          //fbError callback
          function fbError(err){
            
          }

          //fbSuccess callback
          function fbSuccess(response){
            //Storing access token
            fbSignupObject.socialMediaAccessToken = angular.copy(response.authResponse.accessToken);
            getFacebookProfileInfo(response.authResponse).then(function(profileInfo){

              var fbUser={
                facebookId: profileInfo.id,
              }
              //Storing user information from fb
              fbSignupObject.socialMediaUserId = angular.copy(profileInfo.id);
              fbSignupObject.fb_email = angular.copy(profileInfo.email);
              fbSignupObject.email = angular.copy(profileInfo.email);
              fbSignupObject.name = angular.copy(profileInfo.first_name + " " + profileInfo.last_name);
                    
              //Social id to do local login
              accountService.login(null, fbUser, doFbRegisterSuccess, doFbRegisterError);

              facebookConnectPlugin.logout(function(res){},function(err){});
            },function(err){
              });
          };

          function doFbRegisterSuccess(response){
            responseCodeHandling.showMessages(response.code,messages.login.loginSuccess,true,function(status,msg){
                if(status){
                    //Successfully logged in
                    localStorage.set("activeUser",response.data.email);
                    localStorage.set("sessionId",response.data.session_id);
                    $state.go('home');
                    
                }else{
                  //Not a valid fb account do a signup
                  $state.go('signUp', {userData: fbSignupObject});
                }
             });
           
           }

           //doFbRegisterError
           function doFbRegisterError(err){
      
           }
        /**
          *connectWithFacebook function used to fetch user info from facebook
          *
          **/
        $scope.facebookLogin = function(){
            facebookConnectPlugin.getLoginStatus(function(success) {
             if (success.status == 'connected') {
              fbSignupObject.socialMediaAccessToken = angular.copy(success.authResponse.accessToken);
              fbSignupObject.signup_type = 'FB';
                  getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                    var fbUser={
                      facebookId: profileInfo.id,
                    }

                    facebookConnectPlugin.logout(function(res){},function(err){});
                    accountService.login(null, fbUser, doFbRegisterSuccess, doFbRegisterError);
                  }, function(fail) {
                    
                  });
                } else {
            facebookConnectPlugin.login(['email', 'public_profile'], fbSuccess, fbError);
          }
        });
}

        $scope.keypressHandler = function(event, nextIdx){
          var id=document.querySelector('#f_'+nextIdx).id
              if(event.keyCode == 13 && id !== "f_3"){
                event.preventDefault();
                  angular.element(
                      document.querySelector('#f_'+nextIdx))[0].focus();
                  return false;
                }
          }

        $scope.$on('$stateChangeSuccess',function(){
          Object.assign({}, $scope.loginObject);
          Object.assign({}, $scope.from);
        });


    }
})(angular.module('talentNetworkApp'));
