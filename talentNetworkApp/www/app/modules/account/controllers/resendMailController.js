(function (app) {
    app.controller('resendMailCtrl', resendMailCtrl);
    resendMailCtrl.$inject = ['$scope', '$state','localStorage', 'accountService', 'responseCodeHandling', 'loader', 'messages','Config'];

    function resendMailCtrl($scope, $state,localStorage,accountService, responseCodeHandling, loader, messages,Config) {

         
        /*
         * loader is used to indicate activity while blocking user interaction.
         */
         $scope.mail={};
         
        $scope.resendVerificationEmail = function(){
          loader.show();
           var successCallback = function(response){
            loader.hide();
            responseCodeHandling.showMessages(response.code,response.data,true,function(status,msg){
            if(status){
               $state.go("login");
              }
            });
          }

          var errorCallback = function(){
       loader.hide();
          }
          
          accountService.getVerificationEmail(null, {email: $scope.mail.email}, successCallback, errorCallback)
        }     
    }
})(angular.module('talentNetworkApp'));
