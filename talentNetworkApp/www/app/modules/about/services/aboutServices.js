(function (app) {
    app.factory('aboutServices',
    function ($http, $resource,Config) {
        var commonUrl=Config.commonUrl;
        return $resource(null, null, {

            getAboutUs: {
                method: 'GET',
                data: '',
                url: commonUrl + 'about_us_api'
            }
        });
    });


})(angular.module('talentNetworkApp'));
