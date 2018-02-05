(function(app){


    app.factory('celebrityService',
    function ($http, $resource, Config) {
        var commonUrl = Config.commonUrl;

        delete $http.defaults.headers.common['X-Requested-With'];

        return $resource(null, null, {

            getCelebList:{
                method: 'POST',
                url : commonUrl + 'celeb_list_api/:skip/:limit'
            },
            sendCelebInvite: {
                method: 'POST',
                url: commonUrl + 'invite_friend_api'
            },
            fan_unfan_celebs:{
              method: 'POST',
              url: commonUrl  + 'fan_unfan_api'
            },

            getEventDetail:{
                method: 'GET',
                data:'',
                url: commonUrl + 'event_description_api/:eventId'
            },

            getNewTalent:{
                method: 'GET',
                data:'',
                url: commonUrl + 'new_talent/:id'
            },
            addEvent:{
                method:'POST',
                data: '',
                url: commonUrl + 'add_eventapi'

            },


            // participateEvent:{
            //     method:'POST',
            //     data:'',
            //     url: commonUrl + 'event_participate_api'
            // }
        });
    });


})(angular.module('talentNetworkApp'));
