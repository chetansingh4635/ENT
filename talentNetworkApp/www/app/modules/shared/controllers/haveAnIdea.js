(function (app) {
    app.controller('ideaCtrl', ideaCtrl);
    ideaCtrl.$inject = ['$rootScope','$scope','Config','loader','responseCodeHandling','mediaService', '$ionicHistory','actionSheet','sharedService','homeServices','$state','messages'];

    function ideaCtrl($rootScope,$scope,Config, loader, responseCodeHandling, mediaService, $ionicHistory, actionSheet,sharedService,homeServices,$state,messages) {

         
         $scope.idea={};
         $scope.idea.talent=[];
         $scope.idea.acceptance=false;
         $scope.idea.image=null;
         $scope.init=function(){
          notificationCount();
        }
         
        $scope.category;
        $scope.getCategory= function(){
        loader.show();
          var onSuccess=function(response){
            loader.hide();
           
            responseCodeHandling.showMessages(response.code,null,false,function(){
              if(response.data ){
                 $scope.category=response.data;
              }
            });
          }

          var onError=function(err){
             loader.hide();
           
          }

          sharedService.getCategories(null,null,onSuccess,onError);
        }

        $scope.toggleAcceptance=function(){
           if( $scope.idea.acceptance==false)
            $scope.idea.acceptance=true;
          else
            $scope.idea.acceptance=false;
        }

     $scope.addTalent = function(key,value){
      $scope.talentsTouched = true;
            key =  parseInt(key); //Insuring key should is an Integer
            if ((index = $scope.idea.talent.indexOf(key)) !== -1)
              $scope.idea.talent.splice(index, 1);
            else
             $scope.idea.talent.push(key); //else add to array
             
             }

      $scope.checkMarked = function(key,value){
        key =  parseInt(key);
         if( $scope.idea.talent.indexOf(key) !== -1) 
          return true
         else
          return false
      }
         
      $scope.chooseImage = function(){
        if(window.cordova.plugins.Keyboard)
        cordova.plugins.Keyboard.close();

             function captureSucess(imgData){
                   mediaService.uploadMedia(imgData,'image', mediaUploadSucess, mediaUploadError );
             }

             function mediaUploadSucess(res){
                 
                 loader.hide();
                 res = JSON.parse(res.response);
                 responseCodeHandling.showMessages(res.code,null,false, function(){});
                 $scope.idea.image = angular.copy(res.data.file);
                 

             }

            function mediaUploadError(error){
                loader.hide();
             }

             function captureError(error){
                 loader.hide();
                
             }

             actionSheet.openUploadMedia('image', captureSucess, captureError);

        }

        function notificationCount(){

          var success=function(response){
            responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
                if(status){
                   
                    $rootScope.notificationCount = response.data.notificationCount;
                }else{
                       
                  }
            });
               
          }
          var error=function(err){
              
          } 
           homeServices.notificationCount(null,null,success,error);
        }
         
         
         $scope.saveIdea=function(){
          
          var success=function(response){
            loader.hide();
            responseCodeHandling.showMessages(response.code,messages.ideaSaved,true,function(status,msg){
                if(status){
                    $state.go('home');
                }else{
                 
                }
            });
               
          }
          var error=function(err){
            loader.hide();
          } 
          if(!$scope.idea.acceptance)
            responseCodeHandling.showPlaneToast("Please accept terms & conditions", 'short','bottom');
          else if(!$scope.idea.image){
            responseCodeHandling.showPlaneToast("Please choose an image", 'short','bottom');
          }
          else
          {
            loader.show();
            sharedService.shareIdea(null,$scope.idea,success,error);
          }
        }
    }
})(angular.module('talentNetworkApp'));
