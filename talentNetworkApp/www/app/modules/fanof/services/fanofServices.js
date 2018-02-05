(function(app){


    app.factory('fanofService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {
            
            getfanList:{
                method: 'POST',
                data:'',
                url : commonUrl + 'fan_of_celeb/:skip/:limit'
            },
             getuserfanList:{
                method: 'POST',
                data:'',
                url : commonUrl + 'fan_of_user/:skip/:limit'
            },
            fan_unfanuser:{
              method: 'POST',
              data:'',
              url: commonUrl  + 'fan_unfan_api'
            }
           

        });
    });


})(angular.module('talentNetworkApp'));