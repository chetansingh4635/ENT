//Celeberity event controller

(function(app){

	app.controller('celebEventCtrl', celebEventCtrl);

	celebEventCtrl.$inject = ['$scope','$rootScope','responseCodeHandling', 'Config', 'loader', 'celebrityService', '$state'];

	function celebEventCtrl($scope,$rootScope,responseCodeHandling, Config, loader, celebrityService, $state){

		
		$scope.init = init;

		$scope.eventObject = {};
         var d = document.getElementsByTagName("ion-side-menu-content");
         d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
		function init(){

			loader.show();
			function successCallback(response){
				loader.hide()
				$scope.eventObject = angular.copy(response.data);
			}
			
			function errorCallback(error){
				loader.hide();
			}
			celebrityService.getEventDetail({eventId: $state.params.eventId}, null, successCallback, errorCallback);
		}

		//Event listning on sucess state channge
        $scope.$on('$stateChangeSuccess',function(){
          //Initializing state event change success
          $scope.init();
        });
	}

})(angular.module('talentNetworkApp'));