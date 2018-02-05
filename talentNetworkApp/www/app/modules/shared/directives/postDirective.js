//Shared directives

(function(app){

	app.directive('homePost',post);

	post.$inject = ['loader','homeServices','responseCodeHandling','$http','$sce','$ionicPopup','$timeout','$ionicModal','$state','$ionicScrollDelegate','$cordovaSocialSharing','$cordovaAppAvailability','$cordovaToast'];

	function post(loader, homeServices, responseCodeHandling,$http,$sce,$ionicPopup,$timeout,$ionicModal,$state,$ionicScrollDelegate,$cordovaSocialSharing,$cordovaAppAvailability,$cordovaToast){
		return {
			restrict: 'EA',
			templateUrl: './app/modules/shared/templates/postDirective.tpl.html',
			scope:{
				type: '=type',
				data: '=data'
			},

			controller:function($scope, $rootScope){
        $scope.toggle=false;
        $scope.myFunction=function() {
        $scope.toggle=!$scope.toggle;
         }

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function(event) {
          if (!event.target.matches('.dropbtn')) {

            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
              }
            }
          }
        }
        
        $scope.share=function(type,message,link){
          if(type=='fb')
          {
            $cordovaAppAvailability.check('com.facebook.katana')
                  .then(function(success) {
                    // is available
                    console.log(success);
                    window.plugins.socialsharing.shareViaFacebook(message,
                        null, link, function(){console.log('share ok')}, 
                       function(msg) {console.log('error: ' + msg)});
                  }, function (err) {
                    console.log(err);
                    $cordovaToast.show("Please install Facebook","short","bottom");
                  });

          
        }
        else if(type=='twitter'){
                   $cordovaAppAvailability.check('com.twitter.android')
                  .then(function() {
                    // is available
                    window.plugins.socialsharing.shareViaTwitter(message,
                      null, link, function(){console.log('share ok')}, 
                     function(msg) {console.log('error: ' + msg)});
                  }, function () {
                    // not available
                    $cordovaToast.show("Please install Twitter","short","bottom");
                  });
          
        }
        else if(type=='instagram'){
                   $cordovaAppAvailability.check('com.instagram.android')
                  .then(function() {
                    // is available
                    window.plugins.socialsharing.shareViaInstagram(message,
                       link,function(){console.log('share ok')}, 
                     function(msg) {console.log('error: ' + msg)});
                  }, function (err) {
                    // not available
                    console.log(err);
                    $cordovaToast.show("Please install Instagram","short","bottom");
                  });
          
        }
     
      }
        $scope.showModal=function(data){
         $ionicModal.fromTemplateUrl('./app/modules/shared/templates/sharedModal.html', {

            scope: $scope,
            animation: 'slide-in-up',
            hardwareBackButtonClose:false
          }).then(function(modal) { 
                  modal.show();
                  $scope.show=true;
                  $scope.description = data;
                 $scope.modal=modal;
          console.log(modal); });
        }
              $scope.hideModal=function(){
                 delete $scope.description;
                 $scope.modal.remove();
        }
        $scope.isZommed={
          value:false
        };
   
       $scope.checkZommedOrNot=function(){
          var scrollDelegate = $ionicScrollDelegate.$getByHandle('Handle');
           if(view)
            delete view;
            var view = scrollDelegate.getScrollView();
            var scale = view.__zoomLevel;
            // if (scale > 1.1) {
            //     $timeout(function(){
            //    $scope.show= false;
            // }, 100);
            // } else {
            //      $timeout(function(){
            //    $scope.show=true;
            // }, 100);
            // }
        }
        $scope.data.created_at.date =$scope.data.created_at.date ? new Date($scope.data.created_at.date):new Date($scope.data.created_at);
        var width = String(window.screen.width);
      
        $scope.showDetail = function() {
        $timeout(function(){
           $scope.show= !$scope.show;
        }, 100);
       
    }
        $scope.like=true;
        
         var width = String(window.screen.width);
        //  if($scope.data.profile_pic_path){
        //  var profile_pic_path=$scope.data.profile_pic_path;
        //  var b2='f_auto,q_100,w_100';
        //  var n2 = profile_pic_path.indexOf("upload/");
        //  var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
        //  $scope.data.profile_pic_path=output2;
        
        // }
         if($scope.data.media_type=='IMAGE' )
         {
          var media_url=$scope.data.media_url;
          
          var b1='q_50';
          
          var n1 = media_url.indexOf("upload/");
          
          var output1 = [media_url.slice(0, n1+7), b1, media_url.slice(n1+18)].join('');
         
          $scope.data.media_url=output1;
         }
         if($scope.data.media_type=='VIDEO' ) {
           $scope.data.image_url= $scope.data.media_url.substring(0,$scope.data.media_url.lastIndexOf('.')) + '.jpg';
         }

        $scope.toggleAudio = function(){
            loader.show();
              $http({
              method: 'GET',
              url:' https://api.soundcloud.com/resolve.json?url='+$scope.data.media_url+'&client_id=3bfc3fa4c66ca13a86bb55aa1edafab3'
            }).success(function(data){
             $scope.id=data.id;
            
             $scope.media_url=$sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+$scope.id +"&amp;auto_play=true&amp;sharing=false&amp;liking=false");
            
              $scope.popupObject = $ionicPopup.show({
                templateUrl: 'app/modules/shared/templates/soundPlayer.html',
                scope: $scope,
               
            });
               
               
           });
                 
          }
          $scope.iframeLoaded=function(){
            loader.hide();
            }
          $scope.closePopup=function(){
            $scope.popupObject.close();
            loader.hide();
          }
        $scope.onUpdateState = function(state,id){
        
            if(state === 'play' && $rootScope.currentlyPlaying != id){
            $rootScope.currentlyPlaying && $rootScope.currentVideos[$rootScope.currentlyPlaying].stop(); //&& $rootScope.currentVideos[$rootScope.currentlyPlaying].pause();
            $rootScope.currentlyPlaying = id;
          }
        }

        $scope.onInit = function(API, id){
        
          if(!$rootScope.currentVideos) $rootScope.currentVideos = angular.copy([]);
          $rootScope.currentVideos[id] = API;
        }

		       $scope.likePost=function(data){
              if($scope.like){
                    var audio = new Audio('img/like.mp3');
                    audio.play();
                    var status=data.fan_status?"media_unfan":"media_fan";
                    var dataToSend={
                    'id':data.media_id,
                    'status':status
              }
                 
                 data.fan_count=data.fan_status? parseInt(data.fan_count)-1 :parseInt(data.fan_count) +1;
                 data.fan_status = !data.fan_status;
                $scope.like=false;
                
          		
          	var success=function(response){
              $scope.like=true;
            	responseCodeHandling.showMessages(response.code,response.message,false,function(status,msg){
                //  data.user_fans= response.data.newFansCount;
                 	
              		// data.fan_count = response.data.newMediaFanCount;
                      		});
          	}
          	var error=function (err){
            	  $scope.like=true;
               data.fan_count=data.fan_status?parseInt(data.fan_count)-1 :parseInt(data.fan_count)+1;
            	 data.fan_status = !data.fan_status;
          		}
            
            	homeServices.like_Unlike_Media(null,dataToSend,success,error);
            }
            else{}

        }
      
		}
	}	
}
})(angular.module('talentNetworkApp'));