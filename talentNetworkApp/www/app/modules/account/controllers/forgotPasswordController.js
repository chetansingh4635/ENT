(function (app) {
    app.controller('forgotPasswordCtrl', forgotPasswordCtrl);
    forgotPasswordCtrl.$inject = ['$scope', '$state','localStorage', 'accountService', 'responseCodeHandling', 'loader', 'messages','Config'];

    function forgotPasswordCtrl($scope, $state,localStorage,accountService, responseCodeHandling, loader, messages,Config) {

        $scope.forgotPasswordObject = {};
         
        /*
         * loader is used to indicate activity while blocking user interaction.
         */


          $scope.checkEmail = function(){
              loader.show();
              $scope.checkValidity=false;
              if(window.plugins){
                  cordova.plugins.Keyboard.close();
                    }
              var dataToSend = {
                email: $scope.forgotPasswordObject.email,
                    }
            
             function forgotPasswordSuccess(response) {
                  loader.hide();
                  responseCodeHandling.showMessages(response.code,response.message, true,function (status, msg) {
                  if (status) {
                    $state.go('forgotPasswordComplete');
                    } 
                  else {}
                    });
        }
      


        function forgotPasswordError(err) {
            loader.hide();
            
        }

              accountService.forgotPassword(null, dataToSend, forgotPasswordSuccess, forgotPasswordError);
            }
          

        

        
        


       
    }
})(angular.module('talentNetworkApp'));
