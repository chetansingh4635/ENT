(function (app) {
    app.factory('contactServices',
    function ($http, $resource,Config) {
        return $resource(null, null, {
            getContactUs: {
                method: 'GET',
                data: '',
                url: Config.commonUrl + 'contact_us_api'
            },
            contactQuery: {
                method: 'POST',
                url: Config.commonUrl + 'contact_us_query_api'
            }
        });
    });


})(angular.module('talentNetworkApp'));
