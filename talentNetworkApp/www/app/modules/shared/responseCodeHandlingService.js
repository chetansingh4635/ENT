(function (app) {
    app.service('responseCodeHandling', responseCodeHandling);
    responseCodeHandling.$inject = ['messages','$cordovaToast','localStorage','$state'];
    function responseCodeHandling(messages,$cordovaToast, localStorage, $state) {

       /**
         *showToastMessage function is used to show toaster throught the application
         * @message is used to provide custom message to show on toast
         **/
       var showToastMessage=function(message){
        if(!ionic.Platform.is('browser')){
                $cordovaToast.show(message, 'short', 'bottom')
            }
            console.log("message",message);
        }

        this.showPlaneToast = function(message, length, position){
          $cordovaToast.show(message, length, position);
        }

        /**
          *showMessage function is used to find out the appropriate message on basis of code
          *@code is status code that come from api
          *@message that may come from api or custom
          *@isOverride determine that message is custom or api response message
          **/
       this.showMessages=function(code,successMessage,needToShowToast,callback){
            // var common_error=messages.commonError;
            // var invalidLogin=messages.login.invalidLogin;
            // var verifyEmail = messages.login.verifyEmail;
            switch(parseInt(code)){
                case 105:
                case 106: //Invalid session Id
                    showToastMessage(messages.sessionExpired);
                    localStorage.removeAll();
                    $state.go('login');
                    break;
                case 101: //Invalid session Id
                showToastMessage(messages.eventSaved);
                callback(true);
                break;
                case 108:
                    showToastMessage(messages.registration.email_already_taken);
                    callback(false);
                    break;
                case 109:
                    showToastMessage(messages.registration.PasswordNotMatched);
                    callback(false);
                    break;
                case 404:
                      callback(false);
                      break;
                case 411:
                    showToastMessage(messages.login.verifyEmail);
                    callback(false);
                    break; 
                case 421:
                      showToastMessage(messages.login.no_email);
                      callback(false);
                      break;
                case 422:
                      showToastMessage(messages.login.invalidEmail);
                      callback(false);
                      break;
                case 423:
                      showToastMessage(messages.login.invalidEmail);
                      callback(false);
                      break;
                case 424:
                    showToastMessage(messages.login.user_blocked);
                    callback(false);
                    break;
                case 430:
                showToastMessage(messages.forgotPassword.Incorrectoldpassword);
                callback(false);
                break;
                case 431:
                      showToastMessage(messages.forgotPassword.error);
                      callback(false);
                      break;
                case 433:
                    showToastMessage(messages.login.fbSignup);
                    callback(false);
                    break;
                case 434:
                     showToastMessage(messages.resendMail.alreadyActivated);
                     callback(false);
                     break;
                case 435:
                     showToastMessage(messages.resendMail.resetPassword);
                     callback(true);
                     break;  
                case 436:
                     showToastMessage(messages.resendMail.notActivated);
                     callback(true);
                     break; 
                default:
                    if(needToShowToast || angular.isUndefined(needToShowToast)){
                      showToastMessage(successMessage);
                    }
                    if(callback)
                      callback(true);
            }
        }
    }
})(angular.module('talentNetworkApp'));
