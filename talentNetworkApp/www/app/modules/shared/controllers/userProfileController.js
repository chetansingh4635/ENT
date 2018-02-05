(function (app) {
    app.controller('userProfileCtrl', userProfileCtrl);
    userProfileCtrl.$inject = ['$scope', '$state', '$ionicPopup','sharedService','loader','$ionicTabsDelegate','Config','localStorage','responseCodeHandling','actionSheet', 'mediaService','$http','$q','$ionicScrollDelegate','$ionicModal','$timeout','$cordovaInAppBrowser'];

    function userProfileCtrl($scope, $state, $ionicPopup,sharedService,loader, $ionicTabsDelegate,Config, localStorage, responseCodeHandling, actionSheet, mediaService,$http,$q,$ionicScrollDelegate,$ionicModal,$timeout,$cordovaInAppBrowser) {

        /* Scope internal functions*/ 
        $scope.status=true;
        $scope.id='';
        $scope.saveurl;
        $scope.limitSkips = angular.copy(Config.defatultLimitSkipPost);
        $scope.update={};
        $scope.tabChanged = tabChanged;
        $scope.isMoreData = false;
        $scope.userProfile={};
        $scope.postData = {};
        $scope.otherTalents='';
        $scope.like=true;
        var width = String(window.screen.width-50);
        var height = String(window.screen.height-300);
         $scope.showProfile=false;
       
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

        //$scope.pullDownRefresh = refreshData;
         
        var updatePopupTemplates = {
          dob:{templateUrl:'app/modules/profile/templates/updateProfilePopupDob.html'},
          gender:{templateUrl:'app/modules/profile/templates/updateProfilePopupGender.html'},
          contact:{templateUrl:'app/modules/profile/templates/updateProfilePopupContact.html'},
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
       
 
 

        /************end of handling of all popups******************/

        $scope.initProfile=function (){
            var params = {
               id:$state.params.id
            }
           
            var sucessCallback = function(response){
              loader.hide();
             
              $scope.userProfile=response.data;
              $scope.userRole=response.data.role;
              $scope.id=$scope.userProfile.id;
              
              $scope.userProfile.profile_pic_path = $scope.userProfile.profile_pic_path ? $scope.userProfile.profile_pic_path : "img/img7.png";
            angular.forEach(response.data.category, function(value, key) {
            $scope.otherTalents=$scope.otherTalents  +value +", "; 
              //console.log($scope.talents);
          });

             if($scope.userProfile.profile_pic_path!='img/img7.png'){
                         var profile_pic_path= $scope.userProfile.profile_pic_path;
                         var b2='g_face';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.userProfile.profile_pic_path=output2;
                         
                        }
               $scope.otherTalents=$scope.otherTalents.slice(0,-2);
            }

            var errorCallback = function(err){
             
            }

            sharedService.getUserProfile(params,null,sucessCallback,errorCallback);

        }

        $scope.getMyUploads=function (type){
            var params = {
                limit:$scope.limitSkips[type].limit,
                mediaType:type.toUpperCase(),
                skip:$scope.limitSkips[type].skip,
                id:$state.params.id,
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
          
                  var b1='c_thumb,g_face,q_50';
                  
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
               
            }
            
            //params = null; //As api is not complte not sending params   
            sharedService.getMyUploads(params,null,sucessCallback, errorCallback);
        }


        //Create layout fot diffrent type of media
        function createLayout(type, talentArray){
            if(talentArray.length)
                imageLayout = {} 
            if(type == 'image'){
               switch (talentArray.length){
                    case 1: 
                        imageLayout = {}                          
                        imageLayout.leftSidePostsImages= angular.copy(talentArray);
                    break;
                    case 2:
                        imageLayout = {}
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,1));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(1,2));
                    break;
                    case 3:
                        imageLayout = {}
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,1));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(1,3));
                    break;
                    case 4:
                        imageLayout = {}
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,4));
                        
                    break;
                    case 5:
                        imageLayout = {}
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,5));
                    break;
                    case 6: 
                        imageLayout = {}
                        imageLayout.leftSidePostsImages = angular.copy(talentArray.slice(0,2));
                        imageLayout.rightSidePostsImages = angular.copy(talentArray.slice(2,5));
                        imageLayout.fullScreenPostsImages = angular.copy(talentArray.slice(5,6));
                    break;
                }
                console.log(imageLayout);
                $scope.postsObject[type]=imageLayout?$scope.postsObject[type].concat(imageLayout):[];

            }
             
            else {
               $scope.postsObject[type]= $scope.postsObject[type]? $scope.postsObject[type].concat(talentArray):talentArray;
            }

        }

        $scope.followUser = function(){
            if($scope.like){
            var audio = new Audio('img/like.mp3');
             audio.play();
                var params = {
                id: $state.params.id
            }

            //if role 3 || 4 follow user
            //else follow ceeleb

            if($scope.userProfile.role == 3 || $scope.userProfile.role == 5)
                params.status = $scope.userProfile.fan_status ? "user_unfan" : "user_fan";
            else
                params.status = $scope.userProfile.fan_status ? "celeb_unfan" : "celeb_fan";
            
           $scope.userProfile.user_fans=$scope.userProfile.fan_status? parseInt($scope.userProfile.user_fans)-1 :parseInt($scope.userProfile.user_fans) +1;
            $scope.userProfile.fan_status = ! $scope.userProfile.fan_status;
           $scope.like=false;

            var errorCallback = function(error){
               $scope.like=true;
             $scope.userProfile.user_fans=$scope.userProfile.fan_status? parseInt($scope.userProfile.user_fans)+1 :parseInt($scope.userProfile.user_fans) -1;
            $scope.userProfile.fan_status = ! $scope.userProfile.fan_status;
            }

            var sucessCallback = function(response){
                  $scope.like=true;
                // $scope.userProfile.user_fans=response.data.newFansCount;
                // $scope.userProfile.fan_status = !$scope.userProfile.fan_status;             
            }

            sharedService.beAFan(null, params, sucessCallback, errorCallback);

        }
        else{}
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
            $scope.postsObject[$scope.currentTab] = angular.copy(null);
            $scope.limitSkips[$scope.currentTab].skip = angular.copy(Config.defatultLimitSkipPost[$scope.currentTab].skip);
            $scope.getMyUploads($scope.currentTab);

             $scope.$broadcast('scroll.refreshComplete');
        }

        function tabChanged(tab){
            $scope.currentTab = tab;
            $scope.infinteScrollEnabled = $scope.hasMoreData[tab];
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


       

}

})(angular.module('talentNetworkApp'));