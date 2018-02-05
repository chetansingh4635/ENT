(function (app) {
    app.controller('createEventCtrl', createEventCtrl);
    createEventCtrl.$inject = ['$rootScope','$scope','Config','loader','responseCodeHandling','mediaService', '$ionicHistory','actionSheet','sharedService','homeServices','$state','messages','$cordovaDatePicker','celebrityService'];

    function createEventCtrl($rootScope,$scope,Config, loader, responseCodeHandling, mediaService, $ionicHistory, actionSheet,sharedService,homeServices,$state,messages,$cordovaDatePicker,celebrityService) 
    {

         
         $scope.event={};
         $scope.event.talent=[];
          $scope.event.acceptance=false;
      // $scope.getCategory= function(){
      //   loader.show();
      //     var onSuccess=function(response){
      //       loader.hide();
      //       console.log(response);
      //       responseCodeHandling.showMessages(response.code,null,false,function(){
      //         if(response.data ){
      //            $scope.category=response.data;
      //         }
      //       });
      //     }

      //     var onError=function(err){
      //        loader.hide();
      //       console.log("error for get profile",err);
      //     }

      //     sharedService.getCategories(null,null,onSuccess,onError);
      //   }

        
     // $scope.addTalent = function(key,value){
     //  $scope.talentsTouched = true;
     //        key =  parseInt(key); //Insuring key should is an Integer
     //        if ((index = $scope.idea.talent.indexOf(key)) !== -1)
     //          $scope.idea.talent.splice(index, 1);
     //        else
     //         $scope.idea.talent.push(key); //else add to array
     //          console.log($scope.idea.talent);
     //         }

      // $scope.checkMarked = function(key,value)
      // {

      //   key =  parseInt(key);
      //    if( $scope.idea.talent.indexOf(key) !== -1) 
      //     return true
      //    else
      //     return false
          
      // }
         $scope.chooseImage = function(){

             function captureSucess(imgData){
                   mediaService.uploadMedia(imgData,'image', mediaUploadSucess, mediaUploadError );
             }

             function mediaUploadSucess(res){
                 
                 loader.hide();
                 res = JSON.parse(res.response);
                 responseCodeHandling.showMessages(res.code,null,false, function(){});
                 $scope.event.image = angular.copy(res.data.file);
                 

             }

            function mediaUploadError(error){
                loader.hide();
             }

             function captureError(error){
                 loader.hide();
                 
             }

             actionSheet.openUploadMedia('image', captureSucess, captureError);
             //Getting image data
            //mediaService.getMediaFromCamera('Image', captureSucess, captureError);

        }

        // function notificationCount(){

        //   var success=function(response){
        //     responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
        //         if(status){
        //             console.log("notification count",response);
        //             $rootScope.notificationCount = response.data.notificationCount;
        //         }else{
        //                console.log("message from service  error",msg);
        //           }
        //     });
               
        //   }
        //   var error=function(err){
        //       console.log("error",err);
        //   } 
        //    homeServices.notificationCount(null,null,success,error);
        // }
         
         
         $scope.addEvent=function(){
         
          var success=function(response){
            loader.hide();
           
            responseCodeHandling.showMessages(response.code,messages.eventSaved,true,function(status,msg){
                if(status){
                    console.log(response);
                    $state.go('home');
                    
                                    }else{
                  
                  }
            });
               
          }
          var error=function(err){
            loader.hide();
             
          } 

          if(!$scope.event.image)
            responseCodeHandling.showPlaneToast("Please choose an image", 'short','bottom');
         else
         {
          loader.show();
           celebrityService.addEvent(null,$scope.event,success,error);
         }
        }

         $scope.openDatePicker=function(type,format){

          $scope.datePickerOpened = true;
           var dataPikerOptions= {
                date: new Date(),
                mode: format=='date'?'date':'time'
                    };
          $cordovaDatePicker.show(dataPikerOptions).then(function(date){
               if(type=='start_date')
                $scope.event.start_date = moment(date).format('YYYY-MM-DD');
              else if(type=='end_date')
                $scope.event.end_date = moment(date).format('YYYY-MM-DD');
              else if(type=='start_time')
                $scope.event.start_time = moment(date).format('hh mm ss');
              else if(type=='end_time')
                $scope.event.end_time = moment(date).format('hh mm ss');

              if($scope.event.start_date && $scope.event.end_date){
                if($scope.event.start_date > $scope.event.end_date )
                {
                    responseCodeHandling.showPlaneToast("Please choose valid Dates", 'short','bottom');
                $scope.event.start_date=undefined;
                $scope.event.end_date=undefined;
                }
              }
              
            },function(){
                         });  
        }
            

    }
})(angular.module('talentNetworkApp'));
