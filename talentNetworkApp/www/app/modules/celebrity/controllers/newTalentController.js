//  Celeb new talent

(function(app){

	app.controller('newTalentCtrl', newTalentCtrl);

	newTalentCtrl.$inject = ['$scope','$rootScope', 'celebrityService','loader','$state','viewprofileService','responseCodeHandling','Config','messages'];
	
	function newTalentCtrl($scope,$rootScope, celebrityService, loader, $state,viewprofileService,responseCodeHandling,Config,messages){

           var limitSkip = angular.copy(Config.paggingHome);
           $scope.like=true;
            $scope.pullDownRefresh = function(){
  
          //   $scope.celebNewtalents = angular.copy([]);
            
          //   //Resetting pagging object
          //   limitSkip.newTalent = angular.copy(Config.paggingHome.newTalent);
          //   $scope.initNewTalent();
          // $scope.$broadcast('scroll.refreshComplete');
          
        }
      
    var d = document.getElementsByTagName("ion-side-menu-content");
       d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
		$scope.initNewTalent=function (){
			loader.show();
			var successCallback = function(responce){
        loader.hide();
				
				$scope.celebNewtalents = responce.data;
        if($scope.celebNewtalents.profile_pic_path){
         var profile_pic_path=$scope.data.profile_pic_path;
         var b2='f_auto,q_100,w_100';
         var n2 = profile_pic_path.indexOf("upload/");
         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
         $scope.celebNewtalents.profile_pic_path=output2;
        
        }
          
				
			}

			var errorCallback = function(error){
			 loader.hide();
				
			}
			celebrityService.getNewTalent({id:$state.params.id}, null, successCallback, errorCallback);
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
            user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans) +1;
           user.fan_status = !user.fan_status;
    
          }
       
          viewprofileService.fan_unfanuser(null, dataToSend, success, error);
        }
        else{}
      }
	}

})(angular.module('talentNetworkApp'));