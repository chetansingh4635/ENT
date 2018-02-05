//Shared service

(function(app){
	app.service('sharedService', sharedService);

	sharedService.$inject = ['$http', '$resource','Config'];


	function sharedService($http, $resource, Config){

			var commonUrl = Config.commonUrl;
			
		 	delete $http.defaults.headers.common['X-Requested-With'];

			return $resource(null, null, {

			getUserProfile:{
				method: 'GET',
				data: '',
				url: commonUrl + 'profile_api/:id'
				
			},
			 getMyUploads:{
            method: 'GET',
            data:'',
            url: commonUrl + 'my_upload_api/:mediaType/:skip/:limit/:id'
            //url: commonUrl + 'my_upload_api'
        },

			getCategories: {
                method: 'GET',
                data: '',
                url: commonUrl + 'categories_api'
            },

            beAFan:{
            	method:'POST',
            	data: '',
            	url: commonUrl + 'fan_unfan_api'
            },

            shareIdea:{
                method:'POST',
            	data: '',
            	url: commonUrl + 'idea_api'

            },
            crawlApi:{
                method:'POST',
                data: '',
                url: commonUrl + 'crawl_api'
            },
            
            postDescription:{
             method:'GET',
            data: '',
            url: commonUrl + 'media_description_api/:media_id'

            }
            

	    });
	}




})(angular.module('talentNetworkApp'));