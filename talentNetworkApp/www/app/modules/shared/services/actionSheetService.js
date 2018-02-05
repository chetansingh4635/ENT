//Action sheet service

(function(app){
	app.service('actionSheet',actionSheet);

	actionSheet.$inject = ['Config','$ionicActionSheet','mediaService','$ionicPlatform'];

	function actionSheet(Config, $ionicActionSheet,mediaService, $ionicPlatform){
		var actionSheetObj;
		var deregisterHardBack;

		this.openUploadMedia = openUploadMedia;
		this.close = close;
		



		var buttons = [
			{ text: '<b>Camera</b>', mediaSourceType:'camera' },
       		{ text: '<b>Gallery</b>', mediaSourceType:'gallery'}
		]

		function openUploadMedia(type, sucessCallback, errorCallback){

		deregisterHardBack= $ionicPlatform.registerBackButtonAction(
    		function(){
    			actionSheetObj();
    		}, 401);
			actionSheetObj = $ionicActionSheet.show({
				buttons: buttons,
     			cancelText: 'Cancel',
     			cssClass: 'custom_actionsheet',
     			cancel: function(){
     				deregisterHardBack();
     				console.log("Canceled");
     			},
     			buttonClicked: function(index){
     				actionSheetObj();
     				mediaService.getMediaFromCamera(type, buttons[index].mediaSourceType, sucessCallback, errorCallback );
     				
     			}
			});
		}

		function close(){
			actionSheetObj();
		}

	}
})(angular.module('talentNetworkApp'))