(function(app){


    app.factory('categoryService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {
            
            getcategoryList:{
                method: 'GET',
                data:'',
                url : commonUrl + 'categories_api'
            },
             getCategory:{
                method: 'GET',
                data:'',
                url: commonUrl + 'category_data_api/:id',
                
            },

           
            like_Unlike_Media:{
              method: 'POST',
              url: commonUrl  + 'fan_unfan_api'
            },

            notificationCount:{
                method: 'GET',
                data: '',
                url: commonUrl + 'notification_count_api' 
            },

            getOtherCategories:{
                method: 'GET',
                data:'',
                url: commonUrl + 'other_categories_api/:skip/:limit'
            }


        });
    });


})(angular.module('talentNetworkApp'));