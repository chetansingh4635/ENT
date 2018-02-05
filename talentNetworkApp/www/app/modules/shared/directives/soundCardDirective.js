
//Sound directive

(function(app){

	app.directive('soundCardDirective',soundCardDirective);

	soundCardDirective.$inject = ['$http','$rootScope','loader','$q','responseCodeHandling', 'homeServices','$cordovaToast','$ionicPopup','$sce','$cordovaInAppBrowser'];
	function soundCardDirective($http,$rootScope,loader, $q, responseCodeHandling,homeServices,$cordovaToast,$ionicPopup,$sce, $cordovaInAppBrowser){
		return {
			restrict: 'AE',
    		scope:{
        		data: "=data",
    		},
    		templateUrl: 'app/modules/shared/templates/soundCard.tpl.html',

    		link: function(scope){
        scope.like=true;
        scope.openNewWindow=function(url){
                var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                  };
                $cordovaInAppBrowser.open(url, '_blank', options)
                  .then(function(event) {
                    // success
                  })
                  .catch(function(event) {
                    // error
                  });
             }
          var media = document.getElementById("globalAudio");
              scope.likePost=function(singlePost){
                if(scope.like){
              		 var audio = new Audio('img/like.mp3');
                   audio.play();
              		var status=singlePost.fan_status?"media_unfan":"media_fan";
              		var dataToSend={
                	'id':singlePost.media_id,
                	'status':status
              		}
          	var success=function(response){
            	loader.hide();
            	responseCodeHandling.showMessages(response.code,response.message,false,function(status,msg){
            	if(status){
                //   singlePost.fan_status = !singlePost.fan_status;
              		// singlePost.fan_count = response.data.newMediaFanCount;
             	}else{
               		
             		}
          		});
          	}
          	var error=function (err){
            	loader.hide();
            	
          		}
            	
            	homeServices.like_Unlike_Media(null,dataToSend,success,error);
        	}
          else{}
        }
          scope.toggleAudio = function(){
            loader.show();
              $http({
              method: 'GET',
              url:' https://api.soundcloud.com/resolve.json?url='+scope.data.media_url+'&client_id=3bfc3fa4c66ca13a86bb55aa1edafab3'
            }).success(function(data){
             scope.id=data.id;
            
             scope.media_url=$sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+scope.id +"&amp;auto_play=true&amp;sharing=false&amp;liking=false");
            
              scope.popupObject = $ionicPopup.show({
                templateUrl: 'app/modules/shared/templates/soundPlayer.html',
                scope: scope,
                cssClass:'myPopUp'             
            });
               
               
           });
                 
          }
          scope.iframeLoaded=function(){
            loader.hide();
            }
        


 scope.toggleAudio2 = function(){
            $rootScope.$broadcast('toggleIcon',{data:scope.data.media_id});
            media.pause();
            if(scope.is_playing){
              //Pause Song
              scope.is_playing = false;
            }else{
              scope.is_playing = true;
              playSong(scope.data.media_url)
            }
          }

    scope.closePopup=function(){
      scope.popupObject.close();
      loader.hide();
    }
   			function playSong(songurl) {
      			loader.show();
      			var defer = $q.defer();

      			$http({
			        method: 'GET',
			        url:' https://api.soundcloud.com/resolve.json?url='+songurl+'&client_id=3bfc3fa4c66ca13a86bb55aa1edafab3'
			      }).success(function(data){
			       scope.id=data.id;
			  
			      $http({
			        method: 'GET',
			        url:'https://api.soundcloud.com/i1/tracks/' + scope.id + '/streams?client_id=' + '3bfc3fa4c66ca13a86bb55aa1edafab3'
			      }).success(function(response){
			    
			        // merge data into the queue
			         loader.hide();
			        
			         //new Audio(response.http_mp3_128_url);
			         media.src = response.http_mp3_128_url;
               media.addEventListener('loadeddata', function(){
			           defer.resolve();
			         });
			     
			      media.play();
            $cordovaToast.show("playing the song","short","bottom");

			    })
			    }).catch(function(responce){
			      loader.hide();
			      responseCodeHandling.showMessages(responce.status,responce.statusText,false,function(status,msg){
			              if(status){
                         $cordovaToast.show("Error! cannot play music ","short","bottom");
			               }
			             });
      
    });
    }



                  scope.$on(
                        "$destroy",
                        function handleDestroyEvent() {
                          if(scope.is_playing) 
                            {
                              media.pause();
                              scope.is_playing=false;
                            }
                            // console.log( attributes.bnDataTest, ":", element.data( "test" ) );
                        }
                    );

                  scope.$on('toggleIcon', function(event, args) {

                       if(args.data !=scope.data.media_id)
                        scope.is_playing=false;
                        // do what you want to do
                    });
    		}
		}
	}
	
})(angular.module('talentNetworkApp'));