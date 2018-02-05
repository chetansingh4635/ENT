(function (app) {
    app.controller('signupCtrl', signupCtrl);
    signupCtrl.$inject = ['$rootScope','$scope','$state','accountService','Config','loader','responseCodeHandling','mediaService','$cordovaDatePicker', '$ionicHistory','$ionicPopup','$cordovaToast','actionSheet', 'messages','localStorage','$ionicModal'];

    function signupCtrl($rootScope,$scope,$state,accountService,Config, loader, responseCodeHandling, mediaService, $cordovaDatePicker, $ionicHistory, $ionicPopup, $cordovaToast, actionSheet, messages,localStorage, $ionicModal) {


        $scope.user = {};

        $scope.form = {};
        $scope.form.userForm={};
        $scope.form.userForm.email = null;
        angular.merge($scope.user, $state.params.userData);

        $scope.roleImage = angular.copy(Config.roleImages);

        $scope.user.talent = angular.copy([]);

        $scope.openDatePicker = openDatePicker;

        $scope.user.signup_type = $scope.user.signup_type ? $scope.user.signup_type : 'LOCAL'; 

        $scope.showOtherTalentInput = showOtherTalentInput;

        var isTermsOpened = false;

        var termsPopup;

        $scope.getInitialLists = function () {
            $scope.getCategories();
        };

        $scope.checkEmail = function(){

          var successCallback = function(response){
            if(response.code == Config.success)
            {
              $scope.form.userForm.email.$setValidity("email_already_exist", true);
            }
            else
            {
              $scope.form.userForm.email.$setValidity("email_already_exist", false);
            }
          }

          var errorCallback = function(){

          }


          accountService.checkEmail(null, {email: $scope.user.email}, successCallback, errorCallback)
        }

        $scope.getCategories = function () {
            loader.show();
            function success(res) {
                loader.hide();
                if (res.code == 200) {
                    $scope.allCategories = res.data;
                }
            }
            function error(result) {
                loader.hide();
                //$cordovaToast.show('Something went wrong.Please try again!', 'short', 'bottom');
            }
            accountService.getCategories(null, null, success, error);
        };

        $scope.addRemoveTalent = function(key,value){

            $scope.talentsTouched = true;

            key =  parseInt(key); //Insuring key should is an Integer

            if($scope.user.talent.indexOf(key) > -1) $scope.user.talent.pop($scope.user.talent.indexOf(key)); //If allready added remove from array
            else  $scope.user.talent.push(key); //else add to array
             }

        $scope.signup = signup;


        function signup(){
          if(window.plugins){
            cordova.plugins.Keyboard.close();
          }
            loader.show();
              var dataToSend = angular.copy($scope.user);
            dataToSend.version_code = '1.0.1',
            dataToSend.device_id = '76462846327874';
            dataToSend.device_type = 'A';
           

            //Assign image object only if exist
            angular.isDefined($scope.image) && (dataToSend.image = $scope.image)


            var errorCallback = function(error){
                loader.hide();
                
            }

            var seccessCallback = function(response){
                  loader.hide();
                  responseCodeHandling.showMessages(response.code,null,false,function(status,msg){
                  if(status){
                         Object.assign({},$scope.user); //clear user object
                         Object.assign({},$state.params.userData);
                         $ionicHistory.clearHistory();
                         $state.go('signupComplete');  
                         localStorage.set("resendmail",$scope.user.email);  
                                             
                   }else{
                       
                   }
                });

            }

            accountService.signup(null, dataToSend, seccessCallback, errorCallback);
          }

        // //--------------------------------- Registeration -----------------------------------------------------
        $scope.moveToSignUpSubmit = function () {
            if($scope.user.user_type === Config.groupRole){
              //If user is a group adding one member
             
              $scope.user.user_group = angular.copy([{}]);
              $state.go('signupGroup',{userData: $scope.user});
              
            }                
            else
            {
               
                $state.go('signupCategory', { userData: $scope.user });
            }
        };

        $scope.moveToChooseRole = function (isSignupFormValid) {
          if(!isSignupFormValid){
              return;
          }
            //Setting default role
            $scope.checkEmail();
            if($scope.form.userForm.email)
            {
            $scope.user.user_type = Config.defaultRole;

            $state.go('signupChooseRole', { userData: $scope.user });
           }
        };

        $scope.keypressHandlerForSingup = function(event, nextIdx){
              if(event.keyCode == 13){
                  angular.element(
                      document.querySelector('#k_'+nextIdx))[0].focus();
                    return false;
        }
      }

        $scope.chooseImage = function(){

             function captureSucess(imgData){
                 
                 //Success callback for image capture

                 

                 mediaService.uploadMedia(imgData,'image', mediaUploadSucess, mediaUploadError );
             }

             function mediaUploadSucess(res){
                 
                 loader.hide();
                 res = JSON.parse(res.response);
                 responseCodeHandling.showMessages(res.code,null,false, function(){});
                 $scope.image = angular.copy(res.data.file);
                 

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

        function openDatePicker(){

          $scope.datePickerOpened = true;
        
           $cordovaDatePicker.show(Config.dataPikerOptions).then(function(date){
            if(date > new Date())
              $scope.user.dob=new Date();
            else
                $scope.user.dob = moment(date).format('YYYY-MM-DD');
                $scope.datePickerOpened = false;
            },function(){
              $scope.datePickerOpened = false;
            });  
        }

        
        $scope.openBrowser = function(){
        window.open('http://ent.cloudzmall.com/index.php/terms', '_system', 'location=yes');  return false;
        }

        $scope.openTermPopup = function () {
        // loader.show();
        //   if(isTermsOpened) return;
        
        //   isTermsOpened = true;

        //   function error(error){
          
        //     }
            

        //   function success(response){
        //     loader.hide();
            
        //   }
        //   accountService.getTerms(null,null,success, error);


          $ionicModal.fromTemplateUrl('app/modules/account/templates/TermsConditionsPopup.html', {

            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) { 
                   $scope.modal=modal;
                   modal.show();
                  
                   // $scope.data=response.data.body;
        });

        }

        $scope.iAgree = function(){
          isTermsOpened = false;
          $scope.user.acceptance = true;
          termsPopup.close();
        }

        $scope.iDisAgree = function(){

          isTermsOpened = false;
          $scope.user.acceptance = false;
          termsPopup.close();
          //Show toaster here
          $cordovaToast.show(Config.termsMsg, 'short', 'bottom')
        }

        $scope.addMember = function(){
          $scope.user.user_group.push({});
        }

        $scope.removeMember = function(){
         $scope.user.user_group.pop(); 
        }

        function showOtherTalentInput(){

          if($scope.user.talentOther) $scope.user.otherTalent = [""];
          else delete $scope.user.otherTalent;
        }

        $scope.addOtherTalent = function(){
          $scope.user.otherTalent.push("");
        }

        $scope.removeOtherTalent = function(){
         $scope.user.otherTalent.pop(); 
        }

        


        //--------------------------------- Registeration End-----------------------------------------------------
    }
})(angular.module('talentNetworkApp'));
