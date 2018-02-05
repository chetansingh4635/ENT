(function(app){
    app.controller('eventCtrl',eventCtrl);

    eventCtrl.$inject = ['$scope','$rootScope','$state','eventServices','Config','loader','responseCodeHandling','$ionicModal','mediaService','actionSheet','messages'];

    function eventCtrl($scope,$rootScope, $state,eventServices,Config, loader,responseCodeHandling,$ionicModal,mediaService,actionSheet,messages){

        var width = String(window.screen.width);
       $scope.events=[];
       $scope.participate={};
       $scope.imageCount=0;
       $scope.videoCount=0;
       $scope.saveWebLink = saveWebLink;
       $scope.saveSoundWebLink=saveSoundWebLink;
       $scope.participate.acceptance=false;
        $scope.events = angular.copy(null);
       var pageSize = 10;
       var limitSkip = angular.copy(Config.paggingHome.eventlist);
       $scope.loadMore = function(){
          $scope.hasMoreList = false;
          limitSkip.skip+=pageSize;
          $scope.geteventList();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
         var d = document.getElementsByTagName("ion-side-menu-content");
         d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
        $scope.pullDownRefresh = function(){
          
            $scope.events = angular.copy(null);

            //Ressetting page object
            limitSkip=angular.copy(Config.paggingHome.eventlist);
            $scope.geteventList();
            $scope.$broadcast('scroll.refreshComplete');
        }



       $scope.geteventList=function(){
         $scope.hasMoreList = false;
            //  loader.show();
           var success=function(response){
            loader.hide();
           
           $scope.hasMoreList = response.data && (response.data.length === pageSize);
            $scope.events = $scope.events ?$scope.events.concat(response.data):response.data;
            }
          
          var error=function(err){
            loader.hide();
              $scope.events = angular.copy([]);
            
          }
          eventServices.eventList(limitSkip,null,success,error);
        }

         

         $scope.getEventInfo=function(){
     
          // loader.show();
          var success=function(response){
            loader.hide();
           
           
           
          $scope.description=response.data;
           var media_url=$scope.description.image;
          
          var b1='f_auto,q_100,w_512';
          
          var n1 = media_url.indexOf("upload/");
          
          var output1 = [media_url.slice(0, n1+7), b1, media_url.slice(n1+18)].join('');
         
          $scope.description.image=output1;
            
             }
          
          var error=function(err){
            loader.hide();
           
          }
          eventServices.eventDescription({event_id:$state.params.event_id},null,success,error);
        }
        
        
                 $scope.showModal=function(data){
                    $scope.participate={};
                    $scope.participate.uploadedTalent=[];
                        delete $scope.imageData;
                        delete  $scope.videoData;
                        delete $scope.videoCount;
                        delete $scope.imageCount;
                 $ionicModal.fromTemplateUrl('./app/modules/celebrity/templates/eventParticipate.html', {
                    scope: $scope,
                    animation: 'slide-in-up',
                    cssClass:'event-participate'
                  }).then(function(modal) { 
                          $scope.participate.acceptance=false;
                          modal.show();
                          $scope.modal=modal;
                   });
                }
                    $scope.hideModal=function(){
                     

                       $scope.modal.remove();
              }
         $scope.toggleUpload=function(){
        if($rootScope.checkUpload==true){
          $rootScope.checkUpload=false;
          }
        else{
          $rootScope.checkUpload=true;
          }
        }
        
          $scope.openUploadMedia = function(type){

          function successCallback(mediaData){
            //Upload the media on sucess of capture
             if(type=='image')
             $scope.mediaData  = 'Image';
            else if(type=='video')
             $scope.mediaData  = 'Video';
           mediaData=mediaData.split('?');
            // $scope.mediaData  = angular.copy(mediaData);
            mediaService.uploadMedia(mediaData[0],type, mediaUploadSucess, mediaUploadError );
          }

          function errorCallbacck(error){
            loader.hide();
            console.log(error);
          }

          function mediaUploadSucess(response){

            loader.hide();
            console.log(response.response);
            var res = JSON.parse(response.response);
            responseCodeHandling.showMessages(res.code,null,false, function(){});

            //On sucess media upload save object to local controller to send with submit post object
            if(type == 'image') {
                $scope.imageCount=1;
                $scope.imageData= 'Image';
                if($scope.videoCount)
                $scope.participate.uploadedTalent[1] = angular.copy(res.data.file)
               else
                 $scope.participate.uploadedTalent[0] = angular.copy(res.data.file);
          }
            else if(type == 'video')  {
              if( $scope.participate.uploadedTalent.length)
               $scope.videoCount=1;
               $scope.videoData= 'Video';
             if($scope.imageCount)
               $scope.participate.uploadedTalent[1] = angular.copy(res.data.file);
             else
               $scope.participate.uploadedTalent[0] = angular.copy(res.data.file);
                      }
           }

          function mediaUploadError(error){
            loader.hide();
            console.log(error);
             console.log(error.body);
            delete $scope.mediaData;
          }

          actionSheet.openUploadMedia(type, successCallback, errorCallbacck);
        }

        $scope.moveToParticipate=function(){
         $scope.participate.eventId=$state.params.event_id;
           if($scope.weblink){
            if($scope.weblink.validLink== true)
             $scope.participate.youtube=$scope.weblink.url;
           }
           if($scope.soundWeblink){
            if($scope.soundWeblink.validLink== true)
            {
             $scope.participate.generatedCrawlData={
                    user_text:$scope.soundWeblink.title,
                    crawlUrl:$scope.soundWeblink.url,
                    crawlDescription:$scope.soundWeblink.description,
                    crawlImage:$scope.soundWeblink.image,
                    crawlTitle:$scope.soundWeblink.title,
                    }

            }
           }

         var success=function(response){
            loader.hide();
            responseCodeHandling.showMessages(response.code,messages.eventSaved,true,function(status){
            if(status){
             $scope.modal.remove();
             $state.reload();
             }else{
             
             }
           });
           
         console.log(response);
            
             }
          
          var error=function(err){
            loader.hide();
           
          }
          eventServices.eventParticipate({},$scope.participate,success,error);
        }

        function saveWebLink(weblink){
          //Function to save weblink data to controller
          $scope.weblink = weblink
        }
        function saveSoundWebLink(weblink){
          //Function to save weblink data to controller
          $scope.soundWeblink = weblink
        }
        // $scope.toggleAcceptance=function(){
        //   if($scope.participate.acceptance)
        //     $scope.participate.acceptance=false;
        //   else
        //     $scope.participate.acceptance=true;
        // }


        $scope.$on('$stateChangeSuccess',function(){
          //Initializing state event change success
           $scope.hasMoreList = false;
 
        });



 
    

}
})(angular.module('talentNetworkApp'));