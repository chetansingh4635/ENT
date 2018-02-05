//ionic popup scroll delegatehandle

(function(app){
	app.service('customScrollDelegate', customScrollDelegate);

    /* @ngInject */
    function customScrollDelegate($ionicScrollDelegate) {
        var custom = {
            $getByHandle: function(name) {
                var instances = $ionicScrollDelegate.$getByHandle(name)._instances;
                return instances.filter(function(element) {
                    return (element['$$delegateHandle'] == name);
                })[0];
            }
        };

        return custom;
    }
})(angular.module('talentNetworkApp'));