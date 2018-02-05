(function (app) {
    app.controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope','loader','$state','responseCodeHandling','sharedService','$timeout','$ionicScrollDelegate','$cordovaToast'];

    function postCtrl($scope,loader,$state,responseCodeHandling,sharedService,$timeout,$ionicScrollDelegate,$cordovaToast) {

        //Arrays for display most trending and celebs postsion
        $scope.description={};
        $scope.show=true;
        $scope.like=true;
        $scope.isZommed={
          value:false
        };
        // angular.merge($scope.description,$state.params.data);
        $scope.mediaDescription=function(){
          var dataToSend={
              media_id:$state.params.media_id
              }
            var successCallback=function(response){
              loader.hide();
               if(response.code=='437'){
                 window.history.back();
                $cordovaToast.show("This post has been deleted","short","bottom");

               }else{
              $scope.descriptions=response.data;
              // if($scope.descriptions[0].media_type=='IMAGE' )
              //  {
              //   var media_url=$scope.descriptions[0].media_url;
                
              //   var b1='f_auto,q_100,w_512';
                
              //   var n1 = media_url.indexOf("upload/");
                
              //   var output1 = [media_url.slice(0, n1+7), b1, media_url.slice(n1+18)].join('');
               
              //   $scope.descriptions[0].media_url=output1;
              //  }
              if($scope.description.media_type=='IMAGE')
                $scope.description.type= 'image';
              else 
                $scope.description.type= 'video';
            }
          }
            var errorCallback=function (err){
              loader.hide();
              
              }
             
              sharedService.postDescription(dataToSend,null,successCallback,errorCallback);
        }
        $scope.checkZommedOrNot=function(){
          var scrollDelegate = $ionicScrollDelegate.$getByHandle('Handle');
            var view = scrollDelegate.getScrollView();
            // var scale = view.__zoomLevel;
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
        $scope.description.created_at =$scope.description.created_at ? new Date($scope.description.created_at):null;
        var width = String(window.screen.width);
      
        $scope.showDetail = function() {
        $timeout(function(){
           $scope.show= !$scope.show;
        }, 100);
       
    }
       
         
    
        $scope.media_fan_unfan = function(singlePost){

          if($scope.like){
                var audio = new Audio('img/like.mp3');
                    audio.play();
              var status=singlePost.fan_status?"media_unfan":"media_fan";
              var dataToSend={
              'id':singlePost.media_id,
              'status':status
              }
              singlePost.fan_count=singlePost.fan_status? parseInt(singlePost.fan_count)-1 :parseInt(singlePost.fan_count) +1;
              singlePost.fan_status = !singlePost.fan_status;
                $scope.like=false;
            
            var success=function(response){
               $scope.like=true;
              responseCodeHandling.showMessages(response.code,response.message,false,function(status,msg){
              if(status){
                 // singlePost.user_fans=  response.data.newFansCount;
                  
              }
              });
            }
            var error=function (err){
               $scope.like=true;
               singlePost.fan_count=singlePost.fan_status? parseInt(singlePost.fan_count)-1 :parseInt(singlePost.fan_count) +1;
              singlePost.fan_status = !singlePost.fan_status;
                }
               sharedService.beAFan(null,dataToSend,success,error);
          }
          else{}
           }

          $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
          });
       

       }
})(angular.module('talentNetworkApp'));
