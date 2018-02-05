(function(app){
    app.controller('fanof',fanof);

    fanof.$inject = ['$scope','fanofService','responseCodeHandling','Config','$ionicPopup','loader','sharedService','localStorage'];

    function fanof($scope, fanofService, responseCodeHandling,Config,$ionicPopup, loader,sharedService,localStorage){

        $scope.getfanList = getfanList;
        $scope.getuserfanList = getuserfanList;
        // $scope.getCategories = getCategories;
        $scope.filter=false;
        $scope.sort=1;
        var pageSize = 10; //Default page size
        $scope.talents=[];
        $scope.result1=[];
        $scope.result2=[];
        $scope.result1 = angular.copy(null);
        $scope.result2 = angular.copy(null);
        var limitSkip = angular.copy(Config.paggingHome);
        $scope.isMoreData = false;
        $scope.like=true;
         var addMediaPopup;
          var d = document.getElementsByTagName("ion-side-menu-content");
          d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
        $scope.init=function()
        {
         $scope.getCategories();
         $scope.getuserfanList();
         $scope.getfanList();
        }

        $scope.sortList=function()
        {
          if($scope.sort==0)
          {
             $scope.sort=1;
             $scope.result1=[];
             $scope.result2=[];
             $scope.getfanList();
             $scope.getuserfanList();
          }
          else
          {
             $scope.sort=0;
             $scope.result1=[];
             $scope.result2=[];
             $scope.getfanList();
             $scope.getuserfanList();
          }

        }

        $scope.loadMore = function(type){
              $scope.hasMoreCelebFans = false;
              $scope.hasMoreUserFans = false;

             if(type === Config.celebfanlist)
             {           
              limitSkip.celebfanlist.skip+=pageSize;
              $scope.getfanList();
             } 
            else if(type === Config.userfanlist){
            limitSkip.userfanlist.skip+=pageSize;
             $scope.getuserfanList();
          } 

          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
           
           $scope.pullDownRefresh = function(type){
              if(type === Config.celebfanlist){
            //Flushing Most trending array for new data
            $scope.result1 = angular.copy(null);

            //Ressetting page object
            limitSkip.celebfanlist = angular.copy(Config.paggingHome.celebfanlist);
              getfanList();
          } 
          else if(type === Config.userfanlist) {
            //Flushing Celebs posts array for new data
            $scope.result2 = angular.copy(null);

            //Resetting pagging object
            limitSkip.userfanlist = angular.copy(Config.paggingHome.userfanlist);
            getuserfanList();
          }

          
          $scope.$broadcast('scroll.refreshComplete');
          
        }

       
          
          $scope.getCategories= function (){

          var successCallback = function(responce){
           
            $scope.filterOptions = responce.data;

          }

          var errorCallback = function(error){
           
          }

          sharedService.getCategories(null, null, successCallback, errorCallback);
        }
          

    // -----------------------------Applying Filters-------------------------------
           
           $scope.addFilter = function(key,value){
            key =  parseInt(key); //Insuring key should is an Integer
            if ((index = $scope.talents.indexOf(key)) !== -1)
              $scope.talents.splice(index, 1);
            else
             $scope.talents.push(key); //else add to array
             
             }

             $scope.checkMarked = function(key,value){

                key =  parseInt(key);
                 if( $scope.talents.indexOf(key) !== -1) 
                  return true
                 else
                  return false
          
            }
      
   //---------------------------------------------------------------------------------       

        function getfanList(){

          $scope.hasMoreCelebFans=false;
          // loader.show();
           var params = {
              skip: limitSkip.celebfanlist.skip,
              limit: limitSkip.celebfanlist.limit
            }
            
            var DataToSend={
                 "talent" : $scope.talents,
                  "sortValue":$scope.sort
                          }
            var errorCallback = function(error){
              loader.hide();
              $scope.result1 = angular.copy([]);
            }

            var successCallback = function(response){
               loader.hide();
              responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
              if(status){
                  $scope.hasMoreCelebFans = response.data && (response.data.length === pageSize);
                    $scope.result1 = $scope.result1?$scope.result1.concat(response.data):response.data;
                    angular.forEach($scope.result1, function() {
                        if( $scope.result1.profile_pic_path){
                         var profile_pic_path= $scope.result1.profile_pic_path;
                         var b2='f_auto,q_100,w_100';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.result1.profile_pic_path=output2;
                        
                        }
                 });
                   
               }
            });
              
           }
            fanofService.getfanList(params,DataToSend,successCallback,errorCallback);
        }

     
     function getuserfanList(){
          $scope.hasMoreUserFans=false;
          // loader.show();
           var params = {
              skip: limitSkip.userfanlist.skip,
              limit: limitSkip.userfanlist.limit
            }

           var DataToSend={
                 "talent" : $scope.talents,
                  "sortValue":$scope.sort
                          }
            var errorCallback = function(error){
              loader.hide();
              $scope.result2 = angular.copy([]);
            }

            var successCallback = function(response){
              // loader.hide();
            
              //   if(response.code === Config.success) {
              //    $scope.hasMoreUserFans = response.data && (response.data.length === pageSize);
              //       $scope.result2 = $scope.result2?$scope.result2.concat(response.data):response.data;
              //   }

               loader.hide();
              responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
              if(status){
                 
                    $scope.hasMoreUserFans = response.data && (response.data.length === pageSize);
                    $scope.result2 = $scope.result2?$scope.result2.concat(response.data):response.data;
               }
            });
            }

            fanofService.getuserfanList(params,DataToSend,successCallback,errorCallback);
        }


      $scope.fun_Unfanceleb=function(celebrity){
         if($scope.like){
           var audio = new Audio('img/like.mp3');
           audio.play();
          var status=celebrity.fan_status?"celeb_unfan":"celeb_fan";
          var dataToSend={
            'id':celebrity.id,
            'status':status
          }
          celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)-1 :parseInt(celebrity.user_fans) +1;
           celebrity.fan_status = !celebrity.fan_status;
           $scope.like=false;
          var success=function(response){
            $scope.like=true;
           responseCodeHandling.showMessages(response.code,null,false,function(status){
               
                if(status){
                    //  celebrity.fan_status = !celebrity.fan_status;
                    // celebrity.user_fans = response.data.newFansCount;  
                }
            });
          }
          var error=function(err){
             celebrity.user_fans=celebrity.fan_status? parseInt(celebrity.user_fans)-1 :parseInt(celebrity.user_fans) +1;
           celebrity.fan_status = !celebrity.fan_status;
           $scope.like=true;
          }
          fanofService.fan_unfanuser(null,dataToSend,success,error);
        }
        else{}
      }

      $scope.fan_unfan_user=function(user){
           if($scope.like){  
            var audio = new Audio('img/like.mp3');
             audio.play();    
           var status=user.fan_status?"user_unfan":"user_fan";
         
          var dataToSend={
            'id':user.id,
            'status':status
          }
          user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans) +1;
           user.fan_status = !user.fan_status;
           $scope.like=false;
          var success=function(response){
           
            $scope.like=true;
            responseCodeHandling.showMessages(response.code,null,false,function(status){
            if(status){
               //   user.fan_status = !user.fan_status;
              // user.user_fans = response.data.newFansCount;
             
             }
          });
        }
          var error=function(err){
          user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans) +1;
           user.fan_status = !user.fan_status;
            $scope.like=true;
            
          }
       
          fanofService.fan_unfanuser(null, dataToSend, success, error);
        }
        else{}
      }


        $scope.openFilterPopup = function () {
                if(localStorage.get("talent"))
             $scope.talents=localStorage.get("talent");
             addMediaPopup = $ionicPopup.show({
                templateUrl: 'app/modules/myFan/templates/filterPopUp.html',
                scope: $scope,
                buttons: [{ 
                text: 'Submit',
                type: 'button-energized button-squire',
                onTap: function(e) {
                 $scope.applyFilters();
                   }
                 }, {
                    text: 'Clear',
                    type: 'button-stable button-squire',
                    onTap: function(e) {
                      if($scope.talents.length)
                      {
                      $scope.talents=[];
                       $scope.result1=[];
                       $scope.result2=[];
                       $scope.getfanList();
                       $scope.getuserfanList();
                       localStorage.set("talent",$scope.talents);
                     }
                     else
                      e.preventDefault();
                      //$scope.clearFilters();
                   }
                 }]
            });
        }

        $scope.applyFilters = function(){
          $scope.hasMoreUserFans = false;
          $scope.hasMoreCelebFans = false;
          localStorage.set("talent",$scope.talents);
          $scope.result1=[];
          $scope.result2=[];
          $scope.getfanList();
          $scope.getuserfanList();
        } 


    $scope.cancelFilters = function(){
          $scope.hasMoreUserFans = false;
          $scope.hasMoreCelebFans = false;
          $scope.talents=[];
          addMediaPopup.close();
        } 



    }
})(angular.module('talentNetworkApp'));