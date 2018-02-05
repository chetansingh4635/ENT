(function (app) {
    app.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$rootScope','$scope','homeServices','loader','responseCodeHandling','$ionicPopup','Config','$state', 'postService','actionSheet','$rootScope','mediaService','localStorage','$ionicPopover','$cordovaToast','$timeout','$ionicScrollDelegate', 'messages','$cordovaInAppBrowser'];

    function homeCtrl($rootScope,$scope,homeServices,loader,responseCodeHandling,$ionicPopup, Config, $state, postService, actionSheet, $rootScope,mediaService, localStorage,$ionicPopover,$cordovaToast,  $timeout,$ionicScrollDelegate, messages,$cordovaInAppBrowser) {
       $rootScope.checkUpload=false;
        //Arrays for display most trending and celebs posts
        $scope.homePosts = {
          mostTrending:angular.copy(null),
          celebPosts:angular.copy(null)
        };

      
        // $scope.show=true;
        $scope.hide=false;
        $scope.mostTrendingPosts = [];
        $scope.celebsPosts = [];
        $scope.postData = {};

        $scope.popupForm = {};
        
        $scope.saveWebLink = saveWebLink;
        $scope.weblink={};
        $scope.weblink.validLink=null;
        $scope.onTabSelected = onTabSelected;

        $rootScope.role = localStorage.get("role");
        var popupTemplates = Config.uploadMediaPopUp;
                                   
       $scope.toggleUpload=function(){
        if($rootScope.checkUpload==true){
          $rootScope.checkUpload=false;
          }
        else{
          $rootScope.checkUpload=true;
          }
        }
        /*Type for posts to load*/
        $scope.postsType = {
          'mostTrending':{resourceName:'most_trending_api',hasMoreData:false},
          'celebPosts':{resourceName:'celeb_update_api', hasMoreData:false}
        }

        var postUrlsObject = angular.copy({
          image:{resourceName: "image_post_api"},
          video:{resourceName: "video_post_api"},
          audio:{resourceName: "audio_post_api"},
          text:{resourceName: "text_post_api"}
        });

        var pageSize = 10; //Default page size

        var limitSkip = angular.copy(Config.paggingHome);

        var addMediaPopup;
        var currentTab = 'mostTrending'; //Default is most trendigs
         var d = document.getElementsByTagName("ion-side-menu-content");
         d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
        /**
        *Init method will be called every time
        *succes state change to home
        */
         $scope.openNewWindow=function(url){
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

        $scope.init=function(){
           // limitSkip = angular.copy(Config.paggingHome);
           $scope.isLoaded = false;
            getHomePosts();
          }
          
          // $scope.expandList=function()
          // {
          // $scope.show=false;
          // $scope.hide=true;
          // }
          //  $scope.hideList=function()
          // {
          // $scope.show=true;
          // $scope.hide=false;
          // }

     
       /*Called when user scrolls down.
        *type: type of the data to load
        **/
        $scope.loadMore = function(type){
          //$scope.hasMoreMostTrendings = false;
          //$scope.hasMoreCelebPosts = false;
         
          //Initailly no more data
          $scope.postsType[type].hasMoreData = false;
          limitSkip[type].skip+=pageSize;
          getHomePosts();
          

          // if(type == Config.mostTrendingPosts){
          //   getMostTrendingPost();
          //   limitSkip.mostTrending.skip+=pageSize;
          // } 
          // else if(type == Config.celebsPost)s{
          //   getCelebsPost();
          //   limitSkip.celebPost.skip+=pageSize;
          // } 

          $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        /**
        *Pull down to refresh
        *type: type of the data to load
        **/
        $scope.pullDownRefresh = function(type){
                
          $scope.homePosts[type] = angular.copy(null);
          limitSkip[type] = angular.copy(Config.paggingHome[type]);
          getHomePosts();

          $scope.$broadcast('scroll.refreshComplete');
        }


        var getHomePosts = function(){
          //  loader.show();

          //Restrict infinite scroll to get called when Initialloading is not completed
          $scope.postsType[currentTab].hasMoreData = false;

          var params = {
              type: $scope.postsType[currentTab].resourceName,
              skip: limitSkip[currentTab].skip,
              limit: limitSkip[currentTab].limit
            }
          var dataToSend={}

            
          var successCallback=function(success){
                loader.hide();
                responseCodeHandling.showMessages(success.code,null,false,function(status){
                if(status){
                $scope.postsType[currentTab].hasMoreData = success.data && (success.data.length == pageSize);
                $scope.homePosts[currentTab] =$scope.homePosts[currentTab] ? $scope.homePosts[currentTab].concat(success.data) : success.data;               
                $scope.isLoaded = true;
               
          }
        });
     }
          var errorCallback=function(error){
            
              loader.hide();
              $scope.homePosts[type] = angular.copy([]);

          }
          
          homeServices.getHomePosts(params,dataToSend,successCallback,errorCallback);
        }

      
        $scope.openUploadMedia = function(type){

          function successCallback(mediaData){
            //Upload the media on sucess of capture
             if(type=='image')
             $scope.mediaData  = 'Image';
            else if(type=='video')
             $scope.mediaData  = 'Video';
             mediaData=mediaData.split('?');
             // var extension1 = mediaData[0].lastIndexOf(".jpg");
             // var extension2 = mediaData[0].lastIndexOf(".png");
             // var extension3 = mediaData[0].lastIndexOf(".gif");
             // if(extension1 < 0 && extension2 <0 && extension3 <0)
             //   mediaData[0]= mediaData[0].concat(".jpg");
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
            if(type == 'image') {$scope.postData.image = []; $scope.postData.image[0] = angular.copy(res.data.file);}
            else if(type == 'video')  {$scope.postData.video = []; $scope.postData.video[0] = angular.copy(res.data.file);}

           }

          function mediaUploadError(error){
            loader.hide();
            console.log(error);
             console.log(error.body);
            delete $scope.mediaData;
          }

          actionSheet.openUploadMedia(type, successCallback, errorCallbacck);
        }

        /*********************handling of all popups**********************/
        $scope.openUploadMediaPopUp = function (type) {
           delete $scope.mediaData;
           delete $scope.weblink;
            $scope.postData = angular.copy({});


            popupObject = $ionicPopup.show({
                templateUrl: popupTemplates[type],
                scope: $scope,
                buttons: [{ 
                text: 'Submit',
                type: 'button-energized button-squire',
                onTap: function(e) {
                  if(type=='audio'){
                        if(!$scope.weblink){
                        $scope.weblink={};
                        $scope.weblink.validLink=false;
                        e.preventDefault();
                        $scope.popupForm[type].$setSubmitted();
                        }
                        else if($scope.weblink.validLink){
                         $scope.popupForm[type].$setSubmitted();
                        if($scope.popupForm[type].$valid) $scope.submitPost(type);
                        else e.preventDefault();
                       }
                       else {
                        $scope.weblink={};
                        $scope.weblink.validLink=false;
                        $scope.popupForm[type].$setSubmitted();
                      }
                  }
                   else if(type=='text'){
                        if(!$scope.popupForm[type].$valid)
                        {
                        $scope.weblink={};
                        $scope.weblink.validLink=false;
                        e.preventDefault();
                        $scope.popupForm[type].$setSubmitted();
                        }
                        else {
                         $scope.popupForm[type].$setSubmitted();
                         $scope.submitPost(type);
                      }
                  }
                  else if(type=='video' && $scope.postData.youtube)
                  {
                    if(!$scope.weblink){
                        $scope.weblink={};
                        $scope.weblink.validLink=false;
                        e.preventDefault();
                        $scope.popupForm[type].$setSubmitted();
                       }
                       else if($scope.weblink.validLink)
                       {
                      $scope.popupForm[type].$setSubmitted();
                        if($scope.popupForm[type].$valid) $scope.submitPost(type);
                        else e.preventDefault();
                      }  
                      else {
                        $scope.weblink={};
                        $scope.weblink.validLink=false;
                        $scope.popupForm[type].$setSubmitted();
                      }          
                  }
                
                  else
                  {
                  $scope.popupForm[type].$setSubmitted();
                  if($scope.popupForm[type].$valid) $scope.submitPost(type);
                  else e.preventDefault();
                }
                 }
                 }]
            });
        }


        // $scope.openUploadAudioPopUp = function () {
        //   $scope.postData = angular.copy({});
        //     var addMediaPopup = $ionicPopup.show({
        //         templateUrl: 'app/modules/profile/templates/uploadMediaAudioPopUp.html',
        //         scope: $scope,
        //         buttons: [{ 
        //         text: 'Submit',
        //         type: 'button-energized button-squire',
        //         onTap: function(e) {

        //           $scope.popupForm.audioUpload.$setSubmitted();
    
        //           //Execute it if form is valid
        //           if($scope.popupForm.audioUpload.$valid) $scope.submitPost('audio');
        //           else e.preventDefault();
        //          }
        //          }, {
        //             text: 'Cancel',
        //             type: 'button-stable button-squire',
        //              onTap: function(e) {
        //               $scope.postData = angular.copy({});
        //          }
        //          }]
        //     });
        // }

        // $scope.openUploadTextPopUp = function () {
        //   $scope.postData = angular.copy({});
        //     var addMediaPopup = $ionicPopup.show({
        //         templateUrl: 'app/modules/profile/templates/uploadTextPopUp.html',
        //         scope: $scope,
        //         buttons: [{ 
        //         text: 'Submit',
        //         type: 'button-energized button-squire',
        //         onTap: function(e) {
        //           $scope.popupForm.textUpload.$setSubmitted();
    
        //           //Execute it if form is valid
        //           if($scope.popupForm.textUpload.$valid) $scope.submitPost('text');
        //           else e.preventDefault();
        //          }
        //          }, {
        //             text: 'Cancel',
        //             type: 'button-stable button-squire',
        //              onTap: function(e) {
        //               $scope.postData=angular.copy({});
        //          }
        //          }]
        //     });
        // }
        
        // $scope.openUploadVideoPopUp = function () {
        //   $scope.postData = angular.copy({});
        //     var addMediaPopup = $ionicPopup.show({
        //         templateUrl: 'app/modules/profile/templates/uploadVideoPopUp.html',
        //         scope: $scope,
        //         buttons: [{ 
        //         text: 'Submit',
        //         type: 'button-energized button-squire',
        //         onTap: function(e) {

        //           $scope.popupForm.videoUpload.$setSubmitted();
    
        //           //Execute it if form is valid
        //           if($scope.popupForm.videoUpload.$valid) $scope.submitPost('video');
        //           else e.preventDefault();
        //          }
        //          }, {
        //             text: 'Cancel',
        //             type: 'button-stable button-squire',
        //             onTap: function(e) {
        //               $scope.postData=angular.copy({});
        //              delete $scope.mediaData;
        //          }
        //          }]
        //     });
        // }
        /************end of handling of all popups******************/


        $scope.submitPost = function(type){
             loader.show();
            

          if(type == 'audio')
            {                 
              var dataToSend = {
              name: $scope.postData.name,
              description: $scope.postData.description?$scope.postData.description:'No Description',
              crawlUrl: $scope.weblink.url,
              crawlDescription: $scope.weblink.description? $scope.weblink.description:'No Description',
              crawlImage: $scope.weblink.image?$scope.weblink.image:'No Image',
              crawlTitle: $scope.weblink.title?$scope.weblink.title:'No Title'
            
          }
            }else if(type == 'text'){  
               if(!$scope.weblink)  
               {
              var dataToSend = {  
              textPost : $scope.postData.crawUrl,
                               }
               }  
               else if($scope.weblink && $scope.weblink.is_crawl==0)
               { 
                 e.preventDefault();
                 $cordovaToast.show("please enter valid link","short","bottom");
               }
               else
               {    
              var dataToSend = {  
              textPost : $scope.postData.crawUrl,
              is_crawl : $scope.weblink.is_crawl,
              share_title:$scope.weblink.title,
              share_description:$scope.weblink.description,
              share_url:$scope.weblink.url,
              share_image:$scope.weblink.image
              }
            }
            
          }else if(type == 'video'){
              var dataToSend = $scope.postData;
            }
            else
            {
              var dataToSend = $scope.postData;
            }

          function successCallback(responce){
            loader.hide();
       
            responseCodeHandling.showMessages(responce.code,messages.post_saved,true,function(status){
              if(status){

                 $scope.postData =angular.copy({});
                 $scope.mediaData = undefined;
                $scope.weblink = undefined;
               }
             });
          }

          function errorCallback(error){
            loader.hide();
           
          }

          postService.submitPost(postUrlsObject[type],dataToSend, successCallback, errorCallback);
        }

        function hidePopup(){
          loader.hide();
          addMediaPopup.close();
        }

        function saveWebLink(weblink){
          //Function to save weblink data to controller
          $scope.weblink = weblink
        }

        function onTabSelected(type){
          $scope.homePosts[currentTab] = [];
          currentTab = angular.copy(type);
          $scope.homePosts[type] = angular.copy([]);
          limitSkip[type] = angular.copy(Config.paggingHome[type]);
          $scope.isLoaded = false;
          getHomePosts();
        }


        $scope.scrollToTop= function(){
          var popupDelegate = $ionicScrollDelegate.$getByHandle('popup');
          popupDelegate.resize();
          popupDelegate.scrollTop();
        }

        $scope.closePopup = function(){
          popupObject.close();
        }
        $scope.$on('$stateChangeSuccess',function(){
              $scope.homePosts = {
                  mostTrending:angular.copy([]),
                  celebPosts:angular.copy([])
                };
                
                
        });
       // // Event listning on sucess state channge
       //  $scope.$on('$stateChangeSuccess',function(e,toState){
       //    //Initializing state event change success
       //    //$scope.hasMoreMostTrendings = false;
       //    //$scope.hasMoreCelebPosts = false;
       //    console.log(toState.name);
       //    if(toState.name == 'home') 
       //      $scope.init();
       //    else 
       //      $scope.homePosts = angular.copy({mostTrending:[],celebPosts:[]});
       //  });

      
    }
})(angular.module('talentNetworkApp'));
