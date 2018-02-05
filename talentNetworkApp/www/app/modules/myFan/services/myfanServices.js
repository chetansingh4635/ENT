(function(app){


    app.factory('myfanService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {
            
            getfanList:{
                method: 'POST',
                url : commonUrl + 'my_fan_celeb/:skip/:limit'
            },
             getuserfanList:{
                method: 'POST',
                url : commonUrl + 'my_fan_user/:skip/:limit'
            },
             fan_unfanuser:{
              method: 'POST',
              url: commonUrl  + 'fan_unfan_api'
            }
           
           

        });
    });


})(angular.module('talentNetworkApp'));