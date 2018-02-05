(function(app){
    app.factory('eventServices',
    function ($http, $resource,Config) {
        delete $http.defaults.headers.common['X-Requested-With'];
        var commonUrl=Config.commonUrl;
        return $resource(null, null, {

            eventList:{
                method: 'GET',
                data:'',
                url: commonUrl +'event_list_api/:skip/:limit',
                
            },
            eventDescription:{
                 method:'GET',
                 data:'',
                url: commonUrl +'event_description_api/:event_id',


            },
            eventParticipate:{
                method:'POST',
                url: commonUrl +'event_participate_api',
            }
        });
    });


})(angular.module('talentNetworkApp'));
