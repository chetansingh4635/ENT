(function (app) {
    app.controller('categoryCtrl', categoryCtrl);
    categoryCtrl.$inject = ['$scope','$rootScope','categoryService','loader','responseCodeHandling','$state','$ionicPopup','Config','$rootScope', 'celebrityService', 'messages'];

    function categoryCtrl($scope,$rootScope,categoryService,loader,responseCodeHandling,$state,$ionicPopup,Config, $rootScope, celebrityService, messages) {

        //Arrays for display most trending and celebs posts
        $scope.mostTrendingPosts = [];
        $scope.celebsPosts = [];
          $scope.heading=$state.params.id;
        var pageSize = 10; //Default page size

        var limitSkip = angular.copy(Config.paggingHome);

     
        /**
        *Init method will be called every time succes state change to home
        */
        $scope.init=function(){
              getCategoryData();
            }
     
     

        /**
        *Called when user scrolls down.
        *type: type of the data to load
        **/


        var getCategoryData=function(){
          //Restrict infinite scroll to get called when Init loading is not completed
            $scope.hasMoreMostTrendings = false;
            $scope.hasMoreCelebPosts = false;
          loader.show();
            var params = {
             id:$state.params.id
            }
            var dataToSend={}
        
            var successCelebsPost=function(response){
              
              loader.hide();
              responseCodeHandling.showMessages(response.code,null,false,function(status){
              if(status){
                  $scope.hasMoreMostTrendings = response.data && (response.data.length === pageSize);
                  $scope.mostTrendingPosts = response.data.mostTrending;
                  $scope.hasMoreCelebPosts = response.data && (response.data.length === pageSize);
                  $scope.celebsPosts = response.data.celebUpdate;
                  $scope.isLoaded = true;
               }
            });
        }
            var errorCelebsPost=function(error){
              loader.hide();
                
            }
            categoryService.getCategory(params,null,successCelebsPost,errorCelebsPost);
        }



        function notificationCount(){

          var success=function(response){
            responseCodeHandling.showMessages(response.code,null,false,function(status){
                if(status){
                    
                    $rootScope.notificationCount = response.data.notificationCount;
                }
            });
               
          }
          var error=function(err){
             
          } 
           homeServices.notificationCount(null,null,success,error);
        }
        $scope.$on('$stateChangeSuccess',function(e,toState){
          //Initializing state event change success
         if(toState.name !== 'category'){ 
          $scope.mostTrendingPosts = [];
          $scope.celebsPosts = [];
          }

           if($scope.is_playing)
               media.pause();
             
                                
        });
       

       }
})(angular.module('talentNetworkApp'));
