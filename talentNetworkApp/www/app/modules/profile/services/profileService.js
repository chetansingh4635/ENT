(function(app){

    app.factory('profileService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {

          getProfile:{
            method: 'GET',
            data:'',
            url: commonUrl + 'profile_api'
        },
        getMyUploads:{
            method: 'GET',
            data:'',
            url: commonUrl + 'my_upload_api/:mediaType/:skip/:limit/:id'
            //url: commonUrl + 'my_upload_api'
        },
        updateProfile:{
            method: 'POST',  
            url: commonUrl + 'edit_profile_api'

        },

        updateProfilePic:{
            method:'POST',
            url: commonUrl + 'updateProfilePic_api'
        },

        deletePost:{
            method:'POST',
            url: commonUrl + 'delete_api'
        },
        getcategoryList:{
            method: 'GET',
            data:'',
            url: commonUrl + 'category_with_other_api'

        }

        });
    });
})(angular.module('talentNetworkApp'));
