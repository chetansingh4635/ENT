(function (app) {
    app.controller('contactCtrl', contactCtrl);
    contactCtrl.$inject = ['$scope','$rootScope', 'contactServices', 'responseCodeHandling', '$ionicLoading','$ionicPopup','loader','$state','messages'];

    function contactCtrl($scope,$rootScope, contactServices, responseCodeHandling, $ionicLoading, $ionicPopup,loader,$state,messages) {

        $scope.init = function () {
            getContactUs();
        }
       $scope.query={}
       $scope.query.submit=false;
        /*
        * loader is used to indicate activity while blocking user interaction.
        */
       

        var getContactUs = function () {
            loader.show();
            var successGetContactUs = function (response) {
                loader.hide();
                responseCodeHandling.showMessages(response.code, null,false, function (status, msg) {
                  
                    if (status) {
                        $scope.contactUs = response.data;
                    } else {
                       
                    }
                });
            }
            var errorGetContactUs = function (error) {
                loader.hide();
            }
            contactServices.getContactUs(null, null, successGetContactUs, errorGetContactUs);
        }

       $scope.sendQuery=function(){
          
            loader.show();
            var dataToSend={
                message:$scope.query.data
            }
       var successContactUs = function (response) {
                loader.hide();
                
                  responseCodeHandling.showMessages(response.code, response.data, true, function (status, msg) {
                  
                    if (status) {
                        $scope.contactUs = response.data;
                         $state.go('home');
                    } else {
                        
                    }

                });
      }
            var errorContactUs = function (error) {
                loader.hide();
                
                //$cordovaToast.show('Something went wrong.Please try again!', 'short', 'bottom');
            }
            contactServices.contactQuery(null, dataToSend, successContactUs, errorContactUs);


        }

        $scope.queryPopUp = function () {
            var termsPopup = $ionicPopup.show({
                templateUrl: 'app/modules/contact/templates/queryPopUp.html',
                scope: $scope,
                buttons: [{ 
                text: 'Send Query',
                type: 'button-energized button-squire',
                onTap: function(e) {
                  if (!$scope.query.form.$valid) {
            //don't allow the user to close unless he enters wifi password
                       $scope.query.form.$setSubmitted();
                        e.preventDefault();
                      } else {
                         $scope.applyFilters();
                      }


                 
                
                   }
                 }, {
                    text: 'Cancel',
                    type: 'button-stable button-squire',
                    onTap:function(e){
                    $scope.query.submit=false; 
                    $scope.query.data='';
                    }

                 }]
            });
        }
         $scope.applyFilters=function(){
           
                 $scope.sendQuery();
            
       }
    }
})(angular.module('talentNetworkApp'));
