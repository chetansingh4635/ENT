(function(app){
    app.controller('ViewProfile',ViewProfile);

    ViewProfile.$inject = ['$scope','viewprofileService','responseCodeHandling','Config','loader'];

    function ViewProfile($scope, viewprofileService, responseCodeHandling,Config, loader){

        $scope.getuserList = getuserList;
        $scope.getcelebList = getcelebList;
        var pageSize = 10; //Default page size
        $scope.result1=[];
        $scope.result2=[];
        var limitSkip = angular.copy(Config.paggingHome);
         $scope.like=true;
        $scope.loadMore = function(type){
          $scope.hasMoreCelebView = false;
          $scope.hasMoreUserView = false;

          if(type === Config.celebviewed){
           
            limitSkip.celebviewed.skip+=pageSize;
            getcelebList();
          } 
          else if(type === Config.userviewed){
           
            limitSkip.userviewed.skip+=pageSize;
             getuserList();
          } 

          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
           var d = document.getElementsByTagName("ion-side-menu-content");
           d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
          $scope.pullDownRefresh = function(type){
           if(type === Config.celebviewed){
            //Flushing Most trending array for new data
            $scope.result2 = angular.copy([]);

            //Ressetting page object
            limitSkip.celebviewed = angular.copy(Config.paggingHome.celebviewed);
            getcelebList();
          } 
          else if(type === Config.userviewed) {
            //Flushing Celebs posts array for new data
            $scope.result1 = angular.copy([]);

            //Resetting pagging object
            limitSkip.userviewed = angular.copy(Config.paggingHome.userviewed);
           getuserList();
          }

          $scope.$broadcast('scroll.refreshComplete');
         
        }
        function getuserList(){
        $scope.hasMoreUserView = false;
          // loader.show();
           var params = {
              skip: limitSkip.userviewed.skip,
              limit: limitSkip.userviewed.limit
            }
            var errorCallback = function(error){
              loader.hide();
            }

            var successCallback = function(response){
              loader.hide();
              console.log(response);
                if(response.code === Config.success) 
                {
                $scope.hasMoreUserView = response.data && (response.data.length === pageSize);
                    $scope.result1 = $scope.result1.concat(response.data);
                 }
            }

            viewprofileService.getuserList(params,null,successCallback,errorCallback);
        }
           function getcelebList(){
             $scope.hasMoreCelebView = false;
            //  loader.show();
             var params = {
              skip: limitSkip.celebviewed.skip,
              limit: limitSkip.celebviewed.limit
            }
            var errorCallback = function(error){
              loader.hide();
            }

            var successCallback = function(response){
              loader.hide();
              console.log(response);
                if(response.code === Config.success) 
                {
                $scope.hasMoreCelebView = response.data && (response.data.length === pageSize);
                    $scope.result2 = $scope.result2.concat(response.data);
                 }
            }

            viewprofileService.getcelebList(params,null,successCallback,errorCallback);
        }


  $scope.fun_Unfanceleb=function(celebrity){
          if($scope.like){
             var audio = new Audio('img/like.mp3');
             audio.play();
          var status=celebrity.fan_status?"celeb_unfan":"celeb_fan";
          var dataToSend={
            'id':celebrity.id,
            'status':status
          }
          celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)-1 :parseInt(celebrity.user_fans) +1;
           celebrity.fan_status = !celebrity.fan_status;
          $scope.like=false;
          var success=function(response){
            $scope.like=true;
            
            responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
                 
                if(status){
                    // celebrity.fan_status = !celebrity.fan_status;
                    // celebrity.user_fans = response.data.newFansCount;
                  
                    
                }else{
                     
                 }
            });
          }
          var error=function(err){
             $scope.like=true;
           celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)+1 :parseInt(celebrity.user_fans)-1;
           celebrity.fan_status = !celebrity.fan_status;
            
          }
          viewprofileService.fan_unfanuser(null,dataToSend,success,error);
        }
        else{}
      }

$scope.fan_unfan_user=function(user){
          if($scope.like){
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
            responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
            if(status){
              
              // user.fan_status = !user.fan_status;
              // user.user_fans = response.data.newFansCount;
              
             }else{
              
             }
          });
        }
          var error=function(err){
             $scope.like=true;
           user.user_fans=user.fan_status? parseInt(user.user_fans)+1 :parseInt(user.user_fans) -1;
           user.fan_status = !user.fan_status;
            
          }
       
          viewprofileService.fan_unfanuser(null, dataToSend, success, error);
        }
        else{}
      }

        $scope.$on('$stateChangeSuccess',function(){
           //Initializing state event change success
            $scope.hasMoreUserView = false;
           $scope.hasMoreCelebView = false;

        });

    }
})(angular.module('talentNetworkApp'));