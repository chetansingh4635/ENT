(function(app){
    app.factory('searchServices',
    function ($http, $resource,Config) {
        delete $http.defaults.headers.common['X-Requested-With'];
        var commonUrl=Config.commonUrl;
        return $resource(null, null, {

            searchResult:{
                method: 'POST',
                url: commonUrl +'search_api',
                
            },
                 fan_unfanuser:{
                              method: 'POST',
                              url: commonUrl  + 'fan_unfan_api'
                            }



        });
    });


})(angular.module('talentNetworkApp'));
