(function(app){
    app.factory('homeServices',
    function ($http, $resource,Config) {
        delete $http.defaults.headers.common['X-Requested-With'];
        var commonUrl=Config.commonUrl;
        return $resource(null, null, {

            getMostTrendingPost:{
                method: 'POST',
                url: commonUrl + 'most_trending_api/:skip/:limit',
                
            },

            getCelebsPost:{
                method: 'POST',
                url: commonUrl +'celeb_update_api/:skip/:limit',
               
            },

            getHomePosts:{
                method: 'POST',
                url: commonUrl + ':type/:skip/:limit',
                data:''
            },

            getProfile:{
              method: 'GET',
              data:'',
              url: commonUrl + 'profile_api'
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
             notificationList:{
              method: 'GET',
                data: '',
                url: commonUrl + 'notification_api/:skip/:limit' 

            },
            notificationUpdate:{
              method: 'POST',
                url: commonUrl + 'notification_count_update_api' 

            }


           

        });
    });


})(angular.module('talentNetworkApp'));
