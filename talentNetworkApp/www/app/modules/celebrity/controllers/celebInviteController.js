(function (app) {
    app.controller('celebInviteCtrl', celebInviteCtrl);

    celebInviteCtrl.$inject = ['$scope','$rootScope', '$state', 'celebrityService', 'Config', 'loader', 'responseCodeHandling', '$ionicLoading','$cordovaSocialSharing','$cordovaAppAvailability','$cordovaToast'];

    function celebInviteCtrl($scope,$rootScope,$state, celebrityService, Config, loader, responseCodeHandling, $ionicLoading,$cordovaSocialSharing,$cordovaAppAvailability,$cordovaToast) {

        $scope.celebInviteObject = {};

        function successCallback(response) {
            loader.hide();
            responseCodeHandling.showMessages(response.code, null,false, function (status, msg) {
                if (status) {
                    $state.go('celebrityInviteComplete');
                } else {
                    console.log("message from service  error", msg);
                }
            });
        }

        function errorCallback(error) {
            loader.hide();
        }

        $scope.sendCelebInvite = function (ifFormValid) {
          if(!ifFormValid){
            return ;
          }
          if(window.plugins){
            cordova.plugins.Keyboard.close();
          }
            loader.show();
            var dataToSend = {
                email: $scope.celebInviteObject.email,
            };
            celebrityService.sendCelebInvite(null, dataToSend, successCallback, errorCallback);
        }
         $scope.toggle=false;
        $scope.myFunction=function() {
        $scope.toggle=!$scope.toggle;
         }

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
        
        $scope.share=function(type){
          if(type=='fb')
          {
            $cordovaAppAvailability.check('com.facebook.katana')
                  .then(function(success) {
                    // is available
                    console.log(success);
                    window.plugins.socialsharing.shareViaFacebook('Ent Netwrk',
                        null,'entnetwrk.app.link', function(){console.log('share ok')}, 
                       function(msg) {console.log('error: ' + msg)});
                  }, function (err) {
                    console.log(err);
                    $cordovaToast.show("Please install Facebook","short","bottom");
                  });

          
        }
        else if(type=='twitter'){
                   $cordovaAppAvailability.check('com.twitter.android')
                  .then(function() {
                    // is available
                    window.plugins.socialsharing.shareViaTwitter('ENT Netwrk',
                      null,'entnetwrk.app.link', function(){console.log('share ok')}, 
                     function(msg) {console.log('error: ' + msg)});
                  }, function () {
                    // not available
                    $cordovaToast.show("Please install Twitter","short","bottom");
                  });
          
        }
       
      }

    }
})(angular.module('talentNetworkApp'));
