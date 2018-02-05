//post services

(function(app){
	app.service('postService', postService);

	postService.$inject = ['$http', '$resource','Config'];


	function postService($http, $resource, Config){

			var commonUrl = Config.commonUrl;
			
		 	delete $http.defaults.headers.common['X-Requested-With'];

			return $resource(null, null, {

			submitPost:{
                method: 'POST',
                data: '',
                url: commonUrl + ':resourceName'
            },

	    });
	}




})(angular.module('talentNetworkApp'));