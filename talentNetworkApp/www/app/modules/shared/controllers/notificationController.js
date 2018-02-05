//Notification list controller
(function(app){
	app.controller('notificationListCtrl', notificationListCtrl);

	notificationListCtrl.$inject = ['$scope','homeServices','Config','responseCodeHandling','loader'];

	function notificationListCtrl($scope,homeServices,Config,responseCodeHandling,loader){
		
			var pageSize=10;
	        $scope.notificationList=[];
	         var limit = angular.copy(Config.defatultLimitSkip);
	          $scope.init=function()
                       {
                                  notificationFullList();
                        }
		 $scope.loadNotification = function(){
                    $scope.hasMoreNotifications = false;
                      limit.skip+=pageSize;
                      notificationFullList();
                    
                    $scope.$broadcast('scroll.infiniteScrollComplete');
        }

		function notificationFullList(){
			 $scope.hasMoreNotifications = false;

            //  loader.show();
            var successCallback = function(response){
              loader.hide();
            responseCodeHandling.showMessages(response.code,null,false,function(status,msg){

                if(status){
                  //  console.log("notification count",response);
                   $scope.hasMoreNotifications = response.data && (response.data.length === pageSize);
                    $scope.notificationList = $scope.notificationList.concat(response.data);
                   
                    // $rootScope.notificationList = response.data;
                }else{
                       console.log("message from service  error",msg);
                  }
            });
               
          }
          var errorCallback = function(err){
            loader.hide();
              console.log("error",err);
          } 
           homeServices.notificationList(limit,null,successCallback,errorCallback);

      }

		
	}
})(angular.module('talentNetworkApp'));