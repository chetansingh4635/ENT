(function (app) {
    app.controller('userCtrl', userCtrl);
    userCtrl.$inject = ['$rootScope','$scope', 'userService', 'responseCodeHandling', 'Config','loader'];

    function userCtrl($rootScope,$scope, userService, responseCodeHandling,Config, loader) {

         var pageSize = 10; //Default page size
         $scope.users = [];
         $scope.users = angular.copy(null);
         $scope.like=true;
        var limitSkip = angular.copy(Config.paggingHome.userlist);
        
        $scope.loadMore = function(){
          $scope.hasMoreUsers = false;
          limitSkip.skip+=pageSize;
          $scope.getUsers();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

         var d = document.getElementsByTagName("ion-side-menu-content");
         d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
       
        $scope.pullDownRefresh = function(){
          
          //  $scope.users = angular.copy(null);
            //Ressetting page object
            limitSkip=angular.copy(Config.paggingHome.userlist);
            $scope.getUsers();
            $scope.$broadcast('scroll.refreshComplete');
        }


       


         $scope.getUsers=function() {
          $scope.hasMoreUsers = false;
            // loader.show();
                           var successUsers = function (response) {
                          loader.hide();
                        
                          responseCodeHandling.showMessages(response.code, null, false, function (status) {
                              if (status) {
                                $scope.hasMoreUsers = response.data && (response.data.length === pageSize);
                                  $scope.users = $scope.users ? $scope.users.concat(response.data):response.data;
                                 
                  
                              } else {
                                  
                              }
                          });
                      }


                      var errorGetUsers = function (error) {
                          loader.hide();

                      }
            if($rootScope.role == 4 || $rootScope.role == 8)
              userService.getContactRequest(limitSkip,{}, successUsers, errorGetUsers);
            else
              userService.getUsers(limitSkip,{}, successUsers, errorGetUsers);
        }


  $scope.fan_unfan_user=function(user){
           if($scope.like){
             var audio = new Audio('img/like.mp3');
             audio.play();
           var status=user.fan_status?"user_unfan":"user_fan";
          var dataToSend={
            'id':user.id,
            'status':status
          }
           user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans) +1;
           user.fan_status = !user.fan_status;
           $scope.like=false;
          var success=function(response){
           $scope.like=true;
            
        }
          var error=function(err){
             $scope.like=true;
            user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans)+1;
           user.fan_status = !user.fan_status;
          }
       
          userService.fan_unfanuser(null, dataToSend, success, error);
        }
        else{}
      }
         $scope.$on('$stateChangeSuccess',function(){
          //Initializing state event change success
           $scope.hasMoreUsers = false;
          });

    }
})(angular.module('talentNetworkApp'));
