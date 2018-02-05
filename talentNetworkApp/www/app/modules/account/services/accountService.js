(function(app){


    app.factory('accountService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {

            signup: {
                method: 'POST',
                url: commonUrl + 'register_api'
            },

            login: {
                method: 'POST',
                url: commonUrl + "login_api"
            },

            checkEmail:{
                method: 'POST',
                url: commonUrl + "check_emailId_exist_api"
            },

            getCategories: {
                method: 'GET',
                data: '',
                url: commonUrl + 'registration_categories_api',
            },

            forgotPassword: {
                method: 'POST',
                url: commonUrl + "forgot_password_api"
            },

            getTerms: {
                method: 'GET',
                url: commonUrl + "term_condition_api",
                data:''
            },

            changePasswordService: {
                method: 'POST',
                url: commonUrl + "change_password_api"
            }
            ,

            getVerificationEmail:{
                method: 'POST',
                url: commonUrl + "resend_verification_mail_api"
            }
        });
    });


})(angular.module('talentNetworkApp'));