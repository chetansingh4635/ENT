(function (app) {
    app.controller('profileCtrl', profileCtrl);

    profileCtrl.$inject = ['$scope', '$state', '$ionicPopup','profileService','loader','$ionicTabsDelegate','Config','localStorage','responseCodeHandling','actionSheet', 'mediaService','$http','$q','$cordovaToast','postService', 'messages','$cordovaDatePicker','$rootScope','$cordovaInAppBrowser','$ionicModal','$ionicScrollDelegate','$timeout'];

    function profileCtrl($scope,$state, $ionicPopup,profileService,loader, $ionicTabsDelegate,Config, localStorage, responseCodeHandling, actionSheet, mediaService,$http,$q,$cordovaToast, postService, messages, $cordovaDatePicker, $rootScope,$cordovaInAppBrowser,$ionicModal,$ionicScrollDelegate,$timeout) {


        /* Scope internal functions*/ 
        $scope.canDelete=false;
        $scope.initProfile = initProfile;
        $scope.status=true;
        $scope.saveWebLink = saveWebLink;
        $scope.id='';
        $scope.saveurl;
        $scope.limitSkips = angular.copy(Config.defatultLimitSkipPost);
        $scope.update={};
        $scope.tabChanged = tabChanged;
        $scope.isMoreData = false;
        $scope.updateProfileObject = {};
        $scope.updateProfile = updateProfile;
        $scope.postData = {};
        $scope.popupForm = {};
        $scope.media_to_delete;
        var popupObject;
        $scope.form={};
        var popupTemplates = Config.uploadMediaPopUp;
        $scope.tamporary=[];
        $scope.selected=false;
        $scope.talents=[];
        $scope.otherTalents='';
        $scope.error=false;
        $scope.upperTabChanged = upperTabChanged;
        $scope.showOtherTalentInput=showOtherTalentInput;
        $scope.showProfile=false;
        var imageLayout;
        var width = String(window.screen.width-50);
        var height = String(window.screen.height-300);
         var d = document.getElementsByTagName("ion-side-menu-content");
         d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
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
        $scope.toggleProfile=function(){
           $scope.showProfile=!$scope.showProfile;
           if($scope.userProfile.profile_pic_path!='img/img7.png'){
                         $scope.profile_pic_path= $scope.userProfile.profile_pic_path;
                        // var size='h_'+ height+',w_'+width ;
                        //  var b2 = profile_pic_path.replace("w_100", size);
                        //  $scope.profile_pic_path=b2;
                    
                         
                        }
                        else
                          $scope.profile_pic_path='img/img7.png';
        }
          $scope.otherCategories=function(){
          var sucess=function(response){
         
            responseCodeHandling.showMessages(response.code,null,false,function(){
              if(response.data ){
                 $scope.otherCategory=response.data;
              }
            });
          }

          var error=function(err){
            
          }

          profileService.getcategoryList(null,null,sucess,error);
        }
          $scope.addFilter = function(key,value){
            key =  parseInt(key); //Insuring key should is an Integer
            if ((index = $scope.temporary.indexOf(key)) !== -1)
              $scope.temporary.splice(index, 1);
            else
             $scope.temporary.push(key); //else add to array
             
             }
         $scope.checkMarked = function(key,value)
      {

        key =  parseInt(key);
         if( $scope.talents.indexOf(key) !== -1) 
          return true
         else
          return false
          
      }
        

        var updatePopupTemplates = {
          dob:{templateUrl:'app/modules/profile/templates/updateProfilePopupDob.html'},
          gender:{templateUrl:'app/modules/profile/templates/updateProfilePopupGender.html'},
          contact:{templateUrl:'app/modules/profile/templates/updateProfilePopupContact.html'},
          category:{templateUrl:'app/modules/profile/templates/updateProfilePopupCategory.html'},
          email:{templateUrl:'app/modules/profile/templates/updateProfilePopupEmail.html'}
        }

        var postUrlsObject = angular.copy({
          image:{resourceName: "image_post_api"},
          video:{resourceName: "video_post_api"},
          audio:{resourceName: "audio_post_api"},
          text:{resourceName: "text_post_api"}
        });


        // Array for post layouts
        $scope.is_playing = false;
        $scope.postsObject = angular.copy({
            image: [],
            video: [],
            audio: [],
            text: []
        });



        $scope.currentTab = "image";
        $scope.hasMoreData = {"image":false, "video": false, "audio":false, "text": false};

        
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
        //    popupObject = $ionicPopup.show({
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
        //          }]
        //     });
        // }

        // $scope.openUploadTextPopUp = function () {
        //     popupObject = $ionicPopup.show({
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
        //          }]
        //     });
        // }
        
        // $scope.openUploadVideoPopUp = function () {
        //     popupObject = $ionicPopup.show({
        //         templateUrl: 'app/modules/profile/templates/uploadVideoPopUp.html',
        //         scope: $scope,
        //         buttons: [{ 
        //         text: 'Submit',
        //         type: 'button-energized button-squire',
        //         onTap: function(e) {
        //           $scope.popupForm.videoUpload.$setSubmitted();
    
        //           //Execute it if form is valid
        //           if($scope.popupForm.videoUpload.$valid) $scope.submitPost('videos');
        //           else e.preventDefault();
        //          }
        //          }]
        //     });
        // }

        $scope.openUpdateProfile = function(type){
          $scope.updateProfileObject = angular.copy({});

          $scope.updateProfileObject[type] = angular.copy($scope.userProfile[type]); //Copying current value

          popupObject = $ionicPopup.show({
                templateUrl: updatePopupTemplates[type].templateUrl,
                scope: $scope,
                buttons: [{ 
                text: 'Submit',
                type: ' button-energized button-squire',
                onTap: function(e) {
                  if(type=='category' && !$scope.updateProfileObject.otherTalent)
                     { 
                      if(!$scope.temporary.length)
                      {
                       $scope.form.updateProfile.$setSubmitted();
                       e.preventDefault();
                       $scope.error=true;
                     }
                     else{
                       $scope.updateProfile(type,e);$scope.error=false;
                     }
                     }
                  else if( type=='category' && $scope.updateProfileObject.otherTalent.length)
                   { 
                    if(!$scope.form.updateProfile.talent.$error.required)
                    {
                    $scope.updateProfile(type,e);$scope.error=false;
                    }
                    else if($scope.form.updateProfile.talent.$error.required)
                    {
                      $scope.form.updateProfile.$setSubmitted();
                       e.preventDefault();
                       $scope.error=true;
                    }
                    else 
                    { $scope.updateProfile(type,e);$scope.error=false;}
                  }
               
                  else if(type!='category')
                     {
                       $scope.form.updateProfile.$setSubmitted();
                       $scope.updateProfile(type,e);
                      }

                 }
                 }]
            });


        }


        $scope.openDatePicker=function(){

          $scope.datePickerOpened = true;
           var dataPikerOptions= {
                date: new Date($scope.updateProfileObject.dob),
                mode: 'date'
                    };
          $cordovaDatePicker.show(dataPikerOptions).then(function(date){
            if(date > new Date())
              date=new Date();
            else
                $scope.updateProfileObject.dob = moment(date).format('YYYY-MM-DD');
                $scope.datePickerOpened = false;
            },function(){
                         });  
        }


        /************end of handling of all popups******************/

        function initProfile(){
          $scope.talents=[];
          $scope.otherTalents=[];
          // loader.show();
          $scope.otherCategories();
            var sucessCallback = function(response){
              loader.hide();
             
              $scope.userProfile=response.data;
              $scope.id=$scope.userProfile.id;
              $scope.updateProfileObject.gender=response.data.gender;
              $scope.userProfile.profile_pic_path = $scope.userProfile.profile_pic_path ? $scope.userProfile.profile_pic_path : "img/img7.png";
              angular.forEach(response.data.category, function(value, key) {
              $scope.talents.push(parseInt(key));
              $scope.otherTalents=$scope.otherTalents  +value +", "; 
         
          });
                        if($scope.userProfile.profile_pic_path!='img/img7.png'){
                         var profile_pic_path= $scope.userProfile.profile_pic_path;
                         var b2='g_face';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.userProfile.profile_pic_path=output2;
                         
                        }
          
              
              $scope.temporary=angular.copy($scope.talents);
               $scope.otherTalents=$scope.otherTalents.slice(0,-2);
            }

            var errorCallback = function(err){
              loader.hide();
             
            }
            profileService.getProfile(null,null,sucessCallback,errorCallback);

        }

        $scope.getMyUploads=function(type){
            var params = {
                limit:$scope.limitSkips[type].limit,
                mediaType:type.toUpperCase(),
                skip:$scope.limitSkips[type].skip,
                id:$scope.id,
            }
            // loader.show();

            var sucessCallback = function(response){
                loader.hide();
               
           responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
              if(status){

                //changing ionic infinite scroll state if equals to page limit then enable else disable
                $scope.hasMoreData[type] = response.data && (response.data.length == $scope.limitSkips[type].limit);
                $scope.infinteScrollEnabled = $scope.hasMoreData[$scope.currentTab];
                if(type=='image'){
                  angular.forEach(response.data, function(value, key) {
                   var media_url=value.media_url;
          
                  var b1='c_thumb,g_face,q_30';
                  
                  var n1 = media_url.indexOf("upload/");
                  
                  var output1 = [media_url.slice(0, n1+7), b1, media_url.slice(n1+18)].join('');
                 
                  response.data[key].media_url=output1;
                   });
                }

                createLayout(type,response.data);
                }});
            }

            var errorCallback = function(error){
                loader.hide();
                $scope.postsObject[$scope.currentTab] = angular.copy([]);
                
            }
            
            //params = null; //As api is not complte not sending params   
            profileService.getMyUploads(params,null,sucessCallback, errorCallback);
        }


        //Create layout fot diffrent type of media
        function createLayout(type, talentArray){
            if(talentArray.length)
              imageLayout = {}; 
            if(type == 'image'){
                                                             
            switch (talentArray.length){
                    case 1:  
                        imageLayout = {};                         
                        imageLayout.leftSidePostsImages= angular.copy(talentArray);
                    break;
                    case 2:
                        imageLayout = {};                         
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,1));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(1,2));
                    break;
                    case 3:
                        imageLayout = {}; 
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,1));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(1,3));
                    break;
                    case 4:
                        imageLayout = {}; 
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,4));
                        
                    break;
                    case 5:
                        imageLayout = {}; 
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,5));
                    break;
                    case 6:
                        imageLayout = {}; 
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,5));
                        imageLayout.fullScreenPostsImages = angular.copy(talentArray.slice(5,6));
                    break;
                }
                console.log(imageLayout);
                $scope.postsObject[type]=imageLayout?$scope.postsObject[type].concat(imageLayout):[];
            }else 
               $scope.postsObject[type]= $scope.postsObject[type]?$scope.postsObject[type].concat(talentArray):talentArray;
            

        }



        /*
        *load more will be invoked when ever infinite scroll get fired
        *type: type of tab from which it gets fired
        */
        $scope.loadMore = function(){

            $scope.infinteScrollEnabled = $scope.hasMoreData[$scope.currentTab] = false;
            /*Add skip to the no of post should be dispalyed 
            * ex 0 6 || 6 6 || 12 6
            */
            $scope.limitSkips[$scope.currentTab].skip += $scope.limitSkips[$scope.currentTab].limit;

            //Loading more data will be called from infinte scroll
           $scope.getMyUploads($scope.currentTab);
            $scope.$broadcast('scroll.infiniteScrollComplete');
            
        }

        $scope.pullDownRefresh = function(){
            //Flushing previous loaded data
            $scope.postsObject[$scope.currentTab]=angular.copy([]);
            $scope.limitSkips[$scope.currentTab].skip = angular.copy(Config.defatultLimitSkipPost[$scope.currentTab].skip);
            $scope.getMyUploads($scope.currentTab);

             $scope.$broadcast('scroll.refreshComplete');
        }

        function tabChanged(tab){
            $scope.currentTab = tab;
            $scope.infinteScrollEnabled = $scope.hasMoreData[tab];
        }

        function upperTabChanged(tab){
          if(tab == 'basicInfo') $scope.hideUpload = true;
          else $scope.hideUpload = false;
        }

        $scope.openUploadMedia = function(type){

          function successCallback(mediaData){
            if(type=='image')
             $scope.mediaData  = 'Image';
            else if(type=='video')
             $scope.mediaData  = 'Video';
            mediaData=mediaData.split('?');
            // var extension1 = mediaData[0].lastIndexOf(".jpg");
            //  var extension2 = mediaData[0].lastIndexOf(".png");
            //  var extension3 = mediaData[0].lastIndexOf(".gif");
            //  if(extension1 < 0 && extension2 <0 && extension3 <0)
            //    mediaData[0]= mediaData[0].concat(".jpg");
            //Upload the media on sucess of capture
            mediaService.uploadMedia(mediaData[0],type, mediaUploadSucess, mediaUploadError );
          }

          function errorCallbacck(error){
            loader.hide();
            
          }

          function mediaUploadSucess(response){

            loader.hide();
            res = JSON.parse(response.response);
            responseCodeHandling.showMessages(res.code,null,false, function(){});
            
            //On sucess media upload save object to local controller to send with submit post object
            if(type == 'image') {$scope.postData.image = []; $scope.postData.image[0] = angular.copy(res.data.file);}
            else if(type == 'video')  {$scope.postData.video = []; $scope.postData.video[0] = angular.copy(res.data.file);}
          
          }

          function mediaUploadError(error){
            loader.hide();
            delete $scope.mediaData;

          }

          actionSheet.openUploadMedia(type, successCallback, errorCallbacck);
        } 

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
            $state.reload();
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

        function saveWebLink(weblink){
          //Function to save weblink data to controller
          $scope.weblink = weblink
        }

  $scope.startAudio = function(songurl){
         if($scope.is_playing) 
            {
               if($scope.saveurl==songurl){
                     media.pause();
                    $scope.is_playing = false;
                   }
                  else
                  { 
                     media.pause();
                     loader.show();
                    playSong(songurl);
                 
                  }
        } 
        else
        {
        loader.show();
          playSong(songurl);
        }
   };
 
   function playSong(songurl) {
      // o.pauseSong();
    
      var defer = $q.defer();

      $http({
        method: 'GET',
        url:' https://api.soundcloud.com/resolve.json?url='+songurl+'&client_id=3bfc3fa4c66ca13a86bb55aa1edafab3'
      }).success(function(data){
      $scope.id=data.id;
   
      $http({
        method: 'GET',
        url:'https://api.soundcloud.com/i1/tracks/' + $scope.id + '/streams?client_id=' + '3bfc3fa4c66ca13a86bb55aa1edafab3'
      }).success(function(response){
    
        // merge data into the queue
         loader.hide();
        
        media = new Audio(response.http_mp3_128_url);

        media.addEventListener('loadeddata', function(){
          defer.resolve();
        });
     
      media.play();
      $scope.is_playing=true;
      $scope.saveurl=songurl;

    })
    }).catch(function(responce){
     
      responseCodeHandling.showMessages(responce.status,responce.statusText,true,function(status,msg){
              if(status){
                 loader.hide();
               }
             });
      
    });
    
    
    
     
     // return defer.promise;
    }



    function updateProfile(type,e){
             $scope.form.updateProfile.$setSubmitted();
             if($scope.form.updateProfile.$valid)
               {   
                        loader.show();
                         if(type=='category')
                         {
                          $scope.updateProfileObject['talent'] = angular.copy($scope.temporary);
                          //$scope.talents=angular.copy($scope.temporary);
                          $scope.otherTalents=[];
                          $scope.temporary=[];
                         }
                        var errorCallback = function(error){
                          loader.hide();
                        }
                    
                       var successCallback = function(response){
                          loader.hide();
                          initProfile();
                          }
                          debugger;
                        profileService.updateProfile(null,$scope.updateProfileObject,successCallback,errorCallback);
         }
         else e.preventDefault();

          }

    $scope.checkStatus=function(){
      if($scope.status==false)
      {
        $scope.status=true;
       
      }
     else
        $scope.status=false;

    }

    $scope.chooseImage = function(){

             function captureSucess(imgData){ 
                 //Success callback for image capture
                 mediaService.uploadMedia(imgData,'image', mediaUploadSucess, mediaUploadError );
             }

             function mediaUploadSucess(res){
                 loader.hide();
                 res = JSON.parse(res.response);
                 responseCodeHandling.showMessages(res.code,null,false, function(){


                  $scope.image = angular.copy(res.data.file);
                  $scope.user=
                  updateProfilePic();
                 });
              }

            function mediaUploadError(error){
                loader.hide();
             }

             function captureError(error){
                 loader.hide();
                 
             }

             actionSheet.openUploadMedia('image', captureSucess, captureError);
        }


        /*Updating profile pic $scope.image currently selected image from storage*/
       
        function updateProfilePic(){

          loader.show();

          var successCallback = function(response){
            loader.hide();
            responseCodeHandling.showMessages(response.code,messages.profile_pic_updated,true, function(){
                $scope.userProfile.profile_pic_path = angular.copy($scope.image.profile_pic_path);
                 if($scope.userProfile.profile_pic_path!='img/img7.png'){
                         var profile_pic_path= $scope.userProfile.profile_pic_path;
                         var b2='g_face';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.userProfile.profile_pic_path=output2;
                         
                        }
                $rootScope.$broadcast('profilePicUpdated',{path: $scope.image.profile_pic_path});
              });
          }

          var errorCallback = function(error){
            loader.hide();
          }


          profileService.updateProfilePic(null, {image: $scope.image}, successCallback, errorCallback);
        }

          function showOtherTalentInput(){

          if($scope.updateProfileObject.talentOther) $scope.updateProfileObject.otherTalent = [""];
          else delete $scope.updateProfileObject.otherTalent;
        }

        $scope.addOtherTalent = function(){
          $scope.updateProfileObject.otherTalent.push("");
        }

        $scope.removeOtherTalent = function(){
         $scope.updateProfileObject.otherTalent.pop(); 
        }

        $scope.showDelete = function(media_id){
          $scope.media_to_delete = media_id;
        }

        $scope.checkDelete=function(type,post)
        {
          if(post.media_id == $scope.media_to_delete)
            $scope.media_to_delete=undefined;
          else
            { 
              if(type=='image')
                 $scope.showModal(post);
               else if(type=='video')
                $scope.showModal(post);
               {}
          }
        }

        $scope.deletePost=function(type,post)
        {
         
         loader.show();
         var dataToSend={
            "media_id":parseInt(post.media_id),
            "status":"my_profile"
          }
          var successCallback = function(response){
            loader.hide();
           $state.reload();
                 $scope.media_to_delete=undefined;
            responseCodeHandling.showMessages(response.code,messages.profile_pic_updated,false, function(){
                 
              });
          }

          var errorCallback = function(error){
            loader.hide();
            $scope.media_to_delete=undefined;
          }


          profileService.deletePost(null, dataToSend, successCallback, errorCallback);

        }
        $scope.closePopup = function(){
          $scope.temporary=angular.copy($scope.talents);
          popupObject.close();
        }

        $scope.closeEditProfile = function(type){
          delete $scope.updateProfileObject[type];
          popupObject.close();
        }

        $scope.closeUploadPost = function(type){
          delete $scope.mediaData;
          delete $scope.postsObject[type];
          popupObject.close();
        }

        $scope.delete = function(media_to_delete){
         
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
        
        $scope.showDetail = function() {
        $timeout(function(){
           $scope.show= !$scope.show;
        }, 100);
       
    }


// $scope.$on('$locationChangeStart', function (event, next, current) {
//                if($scope.is_playing)
//                     media.pause();
//                 console.log(current);
//       });
}


})(angular.module('talentNetworkApp'));