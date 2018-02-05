
(function(app){
    app.constant('Config', {

    roleImages: {
        4: 'celeb-signup.png',
        3:'signupIndividual.png',
        5:'sign-group.png',
        8:'productionHouse.png'
    },
    groupRole: 5,
    defaultRole: 4,
    apiKey: "c3ab0d69733305b667728674df362e641c7aa724ef66d4d4df805ef004f203e9",
    commonUrl:'https://entnetwrk.com/api/',
    // commonUrl:'http://54.83.205.169/entnetwork_new/public/index.php/api/',
    // commonUrl: 'https://entnetwrk.com/api/',
    mediaUpload: encodeURI('https://entnetwrk.com/api/upload'),
    //mediaUpload: encodeURI('http://172.18.3.59/ankit/talent_networking_clone/public/api/upload'),
    //commonUrl:'/api/',

    success : "200",
    defatultLimitSkipPost:{
            video:{skip:0,limit:6},
            image:{skip:0,limit:6},
            audio:{skip:0,limit:6},
            text:{skip:0,limit:6}
        },
    defatultLimitSkip:{skip:0,limit:10},
    paggingHome:{
        mostTrending:{skip:0,limit:10},
        celebPosts:{skip:0, limit:10},
        celebfriendlist:{skip:0,limit:10},
        userfriendlist:{skip:0,limit:10},
        celebfanlist:{skip:0,limit:10},
        userfanlist:{skip:0,limit:10},
        userlist:{skip:0,limit:10},
        celeblist:{skip:0,limit:10},
        celebviewed:{skip:0,limit:10},
        userviewed:{skip:0,limit:10},
        eventlist:{skip:0,limit:10},
        newTalent:{skip:0,limit:10}
    },

        celebsPosts:'celebpost',
        mostTrendingPosts:'mosttrending',
        celebfriendlist:'celebfriendlist',
        userfriendlist:'userfriendlist',
        celebfanlist:'celebfanlist',
        userfanlist:'userfanlist',
        celebviewed:'celebviewed',
        userviewed:'userviewed',
        termsMsg: 'You need to Agree Terms before signup.',

       dataPikerOptions: {
                date: new Date(),
                mode: 'date', // or 'time'
                maxDate: (new Date()).valueOf(),
                androidTheme: 2,
                doneButtonLabel: 'Set',
                doneButtonColor: '#F2F3F4',
                cancelButtonLabel: 'CANCEL',
                cancelButtonColor: '#000000'
            },
        crawlAPI:encodeURI('http://ent.cloudzmall.com/index.php/api/crawl_api'),
        youtubeDataApiUrl:'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAeTG8LkZdvRVZydamnXTtC_2q-HwIxPj0&part=snippet&id=',
        wwwyoutube: 'www.youtube.com',
        wwwsoundcloud:'www.soundcloud.com',
        youtube: 'youtube.com',
        soundcloud:'soundcloud.com',
        maxVideoSize: 104857600,
        maxImageSize:52428800,
        invalidSoundCloud:'Invalid soundcloud link',
        largeVideoMessage: 'Please choose a media less then 100 Mb',
        largeImageMessage: 'Please choose a image less then 50 Mb',
        uploadMediaPopUp:angular.copy({
          'image': 'app/modules/profile/templates/uploadMediaPopUp.html',
          'video':'app/modules/profile/templates/uploadVideoPopUp.html',
          'audio':'app/modules/profile/templates/uploadMediaAudioPopUp.html',
          'text':'app/modules/profile/templates/uploadTextPopUp.html'
        })


});

})(angular.module('talentNetworkApp'))
