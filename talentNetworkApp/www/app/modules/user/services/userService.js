(function (app) {
    app.factory('userService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;
        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {
            getUsers: {
                method: 'GET',
                data: '',
                url: commonUrl + 'user_list_api/:skip/:limit'
            },
            fan_unfanuser:{
              method: 'POST',
              url: commonUrl  + 'fan_unfan_api'
            },
            getContactRequest:{
                method: 'GET',
                data: '',
                url: commonUrl + 'user_contact_api/:skip/:limit'
            }
        });
    });
})(angular.module('talentNetworkApp'));
