(function(app){

    app.factory('productionHouseService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {

        	getProductionHouse:{
                method: 'GET',
                data:'',
                url: commonUrl +'production_house_list_api/:skip/:limit'
                
               
            },
            fan_unfanuser:{
            method: 'POST',
              data:'',
              url: commonUrl  + 'fan_unfan_api'

            }   	

        });
    });
})(angular.module('talentNetworkApp'));
