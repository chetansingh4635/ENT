(function (app) {
    app.controller('parentCtrl', parentCtrl);
    parentCtrl.$inject = ['$http','$rootScope','$scope','homeServices','categoryService','localStorage','$state','Config','$ionicSideMenuDelegate','responseCodeHandling','loader','$ionicPopover','$ionicModal'];

    function parentCtrl($http,$rootScope,$scope,homeServices,categoryService,localStorage,$state,Config, $ionicSideMenuDelegate, responseCodeHandling,loader,$ionicPopover,$ionicModal) {
        $scope.list=[];
        $scope.talents=[];
        $scope.othersCatShown=true;
        var pageSize=10;
        var limitSkip = angular.copy(Config.defatultLimitSkip);
        
         $scope.goBack=function(){
         window.history.go(-1);
         }
         $scope.openMenu=function()
              { var d = document.getElementsByTagName("ion-side-menu-content");
               
                var e = document.getElementsByTagName("ion-side-menus");
                d[0].className += " left-sidemenu-content";
                 $ionicSideMenuDelegate.toggleLeft();
              }
           $scope.closeMenu=function()
           {
                 var d = document.getElementsByTagName("ion-side-menu-content");
                 $ionicSideMenuDelegate.toggleLeft();
                d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
           }
               $scope.openRightMenu=function(){ 
               var d = document.getElementsByTagName("ion-side-menu-content");
                d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
                $ionicSideMenuDelegate.toggleRight();

       }

              $scope.init=function()
                       {
                                  getUserProfile();
                                  getcategory();
                                  notificationCount();
                                  notifications();
                                  
                        }

                 
                $scope.hideMenu=function()
                        {
                          $scope.isActive=false;
                          $scope.isenable=false;
                        }
       
        $scope.isActive=false;
        $scope.isenable;
        $scope.category;
        $scope.loadMoreOtherCat = false;
              var otherCategoryParams =
                   {
                    skip:0,
                    limit:10
                  };
          $ionicPopover.fromTemplateUrl('app/modules/home/templates/popover.html', {
                                    scope: $scope,
                                  }).then(function(popover) {
                                    $scope.popover = popover;
                                      });
         $rootScope.admin_verified=localStorage.get('admin_verified');
        $scope.getOtherCategories = getOtherCategories;
       

                                                               
               $scope.closePopover=function(notification)
                     {
                     $scope.popover.hide();
                     if(notification.notification_type=='App\\Models\\Talent')
                      $state.go('postDescription', {media_id: notification.notification_type_id});
                     // else if(notification.notification_type=='App\\Models\\Event')
                     //    $state.go('eventDescription', {event_id: notification.notification_type_id});
                     else if(notification.notification_type=='App\\Models\\UsersFan')
                       $state.go('myFan');
                     else if(notification.notification_type=='App\\Models\\User')
                       $state.go('userProfile', {id: notification.sender_id});

                     }
                     
   
                 $scope.showPopOver=function($event)
                 {
                    $scope.popover.show($event);
                                var dataToSend={
                                            "totalCount": parseInt($rootScope.totalCount)
                                               }
                                 var success=function(response){
                                                  
                                       $rootScope.notificationCount = 0;
                               
                                              }
                              var error=function(err){
                                  //console.log("error",err);
                              } 
                               homeServices.notificationUpdate(null,dataToSend,success,error);

                 }
   
        function notifications(){
          loader.show();
            var successCallback = function(response){
              loader.hide();
            responseCodeHandling.showMessages(response.code,null,false,function(status,msg){

                if(status){
                  //  console.log("notification count",response);
                  
                    $scope.notification = response.data;
                   
                    // $rootScope.notificationList = response.data;
                }else{
                      
                  }
            });
               
          }
          var errorCallback = function(err){
            loader.hide();
             
          } 
           homeServices.notificationList(limitSkip,null,successCallback,errorCallback);

      }





     // $scope.addTalent = function(key,value){
     //        key =  parseInt(key); //Insuring key should is an Integer
     //        if ((index = $scope.talents.indexOf(key)) !== -1)
     //          $scope.talents.splice(index, 1);
     //        else
     //         $scope.talents.push(key); //else add to array
             
     //         }

     //  $scope.checkMarked = function(key,value)
     //  {

     //    key =  parseInt(key);
     //     if( $scope.talents.indexOf(key) !== -1) 
     //      return true
     //     else
     //      return false
          
     //  }



       

     function getUserProfile(){

          var sucess=function(response){
            
            responseCodeHandling.showMessages(response.code,null,false,function(status){
              $scope.user=response.data;
              if(response.data && response.data.profile_pic_path == ""){
                  $scope.user.profile_pic_path = 'img/img7.png'
              }
              localStorage.set('user',$scope.user);  
            });
          }

          var error=function(err){
            
          }
            homeServices.getProfile(null,null,sucess,error);
        }
      
        function notificationCount(){

          var success=function(response){
            responseCodeHandling.showMessages(response.code,response.message,false,function(status,msg){
                if(status){
                    
                    $rootScope.notificationCount = response.data.notificationCount;
                    $rootScope.totalCount=response.data.totalCount
                }else{
                      
                  }
            });
               
          }
          var error=function(err){
            
          } 
           homeServices.notificationCount(null,null,success,error);
        }

        function getcategory(){
          var sucess=function(response){
          
            responseCodeHandling.showMessages(response.code,null,false,function(){
              if(response.data ){
                 $scope.category=response.data;
              }
            });
          }

          var error=function(err){
           
          }

          categoryService.getcategoryList(null,null,sucess,error);
        }

        function getOtherCategories(){
          loader.show();
          $scope.othersCatShown = false;
          $scope.hide=true;
          $scope.loadMoreOtherCat = false;
          if(angular.isDefined(!$scope.otherCategory)) $scope.otherCategory =[];

          var successCallback = function(response){
            loader.hide();

            $scope.otherCategory = $scope.otherCategory.concat(response.data);
          }

          var errorCallback = function(error){
            loader.hide();
          }


          categoryService.getOtherCategories(otherCategoryParams, null, successCallback, errorCallback);
        }

        $scope.logout=function(){
            localStorage.removeAll();
            var d = document.getElementsByTagName("body");
            d[0].className = d[0].className.replace(" userTheme", "");
            $state.go('login');
        }
        
        // $scope.$on('$stateChangeSuccess',function(){
        //   //Initializing state event change success
        //   var d = document.getElementsByTagName("ion-side-menu-content");
        //     d[0].className = d[0].className.replace(" left-sidemenu-content", "");
        //        });
       
        $rootScope.$on('profilePicUpdated', function(event, args){
          
          $scope.user.profile_pic_path = args.path;
        });
       
    }
})(angular.module('talentNetworkApp'));
