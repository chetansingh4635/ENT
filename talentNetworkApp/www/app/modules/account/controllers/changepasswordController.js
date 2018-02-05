(function (app) {
    app.controller('changePasswordCtrl', changePasswordCtrl);
    changePasswordCtrl.$inject = ['$scope', '$state','localStorage','$ionicHistory', 'accountService', 'responseCodeHandling', '$ionicLoading', 'messages','loader'];

    function changePasswordCtrl($scope, $state, localStorage,$ionicHistory,accountService, responseCodeHandling, $ionicLoading, messages, loader) {

        $scope.forgotPasswordObject = {};
        
        /*
         * loader is used to indicate activity while blocking user interaction.
         */

       
        function changePasswordSuccess(response) {
            loader.hide();
                      
            responseCodeHandling.showMessages(response.code,messages.passwordChanged, true,function () {
              if(status)
              {
                $scope.forgotPasswordObject = {};
                $state.go('home');
                } 
            });
        }


       
        function changePasswordError(err) {
            loader.hide();
            }



        $scope.changePassword =function () {
            loader.show();
            if(window.plugins){
                cordova.plugins.Keyboard.close();
            }
          
            accountService.changePasswordService(null, $scope.forgotPasswordObject, changePasswordSuccess, changePasswordError);
        };      
    }
})(angular.module('talentNetworkApp'));
