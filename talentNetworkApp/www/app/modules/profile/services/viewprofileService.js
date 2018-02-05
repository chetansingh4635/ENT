(function(app){


    app.factory('viewprofileService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {
            
            getuserList:{
                method: 'POST',
                data:'',
                url : commonUrl + 'who_view_profile_user_api/:skip/:limit'
            },
             getcelebList:{
                method: 'POST',
                data:'',
                url : commonUrl + 'who_view_profile_celeb_api/:skip/:limit'
            },
            fan_unfanuser:{
              method: 'POST',
              url: commonUrl  + 'fan_unfan_api'
            }
           

        });
    });


})(angular.module('talentNetworkApp'));