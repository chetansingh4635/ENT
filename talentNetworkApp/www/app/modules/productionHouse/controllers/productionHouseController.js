(function(app){

	app.controller('productionHouse',productionHouse);

	productionHouse.$inject = ['$scope','$rootScope','productionHouseService','loader','Config','responseCodeHandling'];

	function productionHouse($scope,$rootScope,productionHouseService, loader, Config, responseCodeHandling){

		$scope.productionHouseList = [];
	  $scope.productionHouseList=angular.copy(null);
	    var limitSkip;
		$scope.pullDownRefresh = pullDownRefresh;
		$scope.loadMore = loadMore;
        $scope.like=true;
		

		function pullDownRefresh(){

			$scope.productionHouseList = angular.copy(null);		
			limitSkip = angular.copy(Config.defaultLimitSkip);
			$scope.getProductionHouseList();
			$scope.$broadcast('scroll.refreshComplete');
		}


		$scope.getProductionHouseList=function(){	
			// loader.show();
			limitSkip = angular.copy(Config.defatultLimitSkip);
			var successCallback = function(response){
			
				loader.hide();
				responseCodeHandling.showMessages(response.code,null,false,function(status){
                if(status){
    				      $scope.productionHouseList=$scope.productionHouseList ? $scope.productionHouseList.concat(response.data):response.data;            	
                 angular.forEach($scope.productionHouseList, function() {
                        if( $scope.productionHouseList.profile_pic_path){
                         var profile_pic_path= $scope.productionHouseList.profile_pic_path;
                         var b2='f_auto,q_100,w_100';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.productionHouseList.profile_pic_path=output2;
                        
                        }
                 });
            

                }
            });
			}

			var errorCallback = function(error){
				loader.hide();
				$scope.productionHouseList=angular.copy([]);
			}


			productionHouseService.getProductionHouse(limitSkip, null, successCallback, errorCallback);

		}
		
      $scope.fun_Unfan=function(user){
          
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
             }
          });
        }
          var error=function(err){
             $scope.like=true;
            user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans)+1;
           user.fan_status = !user.fan_status;
              $scope.productionHouseList = angular.copy([]);  
            }
       
          productionHouseService.fan_unfanuser(null, dataToSend, success, error);
        }
        else{}
    }

		function loadMore(){
			
		}

		//Event listning on sucess state channge
        // $scope.$on('$stateChangeSuccess',function(){
        
        //   //Initializing state event change success
        //   getProductionHouseList();
        // });


	}


	
})(angular.module('talentNetworkApp'))