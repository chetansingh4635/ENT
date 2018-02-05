(function(app){
    app.controller('celebList',celebList);

    celebList.$inject = ['$scope','$rootScope','celebrityService','Config','loader','responseCodeHandling','$state','messages'];

    function celebList($scope,$rootScope,celebrityService, Config, loader,responseCodeHandling,$state,messages){

        $scope.getCelebList = getCelebList;
        $scope.goToCelebProfile = goToCelebProfile;
        var pageSize = 10; //Default page size
        $scope.celebList=[];
        $scope.celebList = angular.copy(null);
        $scope.like=true;
        var limitSkip = angular.copy(Config.paggingHome.celeblist);
         $scope.loadMore = function(){
          $scope.hasMoreCelebs = false;
          limitSkip.skip+=pageSize;
          getCelebList();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

         $scope.pullDownRefresh = function(){
           $scope.celebList = angular.copy(null);

            //Ressetting page object
            limitSkip = angular.copy(Config.paggingHome.celeblist);
            getCelebList();
          $scope.$broadcast('scroll.refreshComplete');
         
        }
         var d = document.getElementsByTagName("ion-side-menu-content");
       d[0].className = d[0].className.replace(" left-sidemenu-content"," ");

        function getCelebList(){
          // loader.show();
           
           var dataToSend={}
            var errorCallback = function(error){
              loader.hide();
              $scope.celebList = angular.copy([]);
              
            }

            var successCallback = function(response){
              
              loader.hide();
              responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
              if(status){
                 $scope.hasMoreCelebs = response.data && (response.data.length === pageSize);
                    $scope.celebList = $scope.celebList ? $scope.celebList.concat(response.data) : response.data;
                    angular.forEach( $scope.celebList, function() {
                        if( $scope.celebList.profile_pic_path){
                         var profile_pic_path= $scope.celebList.profile_pic_path;
                         var b2='f_auto,q_100,w_100';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.celebList.profile_pic_path=output2;
                         
                        }
          
                    });
                   
               }
            });
            }
            celebrityService.getCelebList(limitSkip,dataToSend,successCallback,errorCallback);
        }

        $scope.fun_Unfan=function(celebrity){
          if($scope.like){
             var audio = new Audio('img/like.mp3');
             audio.play();
          var status=celebrity.fan_status?"celeb_unfan":"celeb_fan";
          var dataToSend={
            'id':celebrity.user_id,
            'status':status
          }
           celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)-1 :parseInt(celebrity.user_fans) +1;
           celebrity.fan_status = !celebrity.fan_status;
           $scope.like=false;
          var success=function(response){
             $scope.like=true;
           //  celebrity.fan_status = !celebrity.fan_status;
           // celebrity.user_fans = response.data.newFansCount;
               
          }
          var error=function(err){
            $scope.like=true;
           celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)+1 :parseInt(celebrity.user_fans) -1;
           celebrity.fan_status = !celebrity.fan_status;
          }
          celebrityService.fan_unfan_celebs(null,dataToSend,success,error);
        }
        else{}
      }

        function goToCelebProfile(user){
          $state.go('profile',{"user_id":user_id})
        }

        $scope.$on('$stateChangeSuccess',function(){
          //Initializing state event change success
           $scope.hasMoreCelebs = false;
          $scope.init();
        });
    }
})(angular.module('talentNetworkApp'));
