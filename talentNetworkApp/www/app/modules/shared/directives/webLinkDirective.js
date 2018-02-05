//Weblink Directive

(function(app){

	app.directive('webLink', function($http, $timeout, $sce,Config,sharedService) {
  return {
    restrict: 'AE',
    scope:{
        value: "=value",
        execute: '&saveWebLink',

    },
    templateUrl: 'app/modules/shared/templates/weblink.tpl.html',

    link: function(scope, element, attrs) {

        var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var regExp = new RegExp(expression);

        scope.$watch('value',function(){
            //Search url only if url is not null or undefined

            (!scope.value || searchUrl());
        });

    	scope.openBrowser = openBrowser;
        scope.validLink = false;

    	function getUrlInfoSoundCloud(url){

    		$http({
    			method: 'GET',
    			 url:' https://api.soundcloud.com/resolve.json?url='+url+'&client_id=3bfc3fa4c66ca13a86bb55aa1edafab3',
    			
    		})
    		.success(function(success){
            scope.description=success.description;
            scope.title=success.title;
            scope.image=success.artwork_url;
            scope.url = url;
            scope.validLink = success.kind === 'track';
            scope.execute({"data" : {image: scope.image, description: scope.description, title: scope.title, url: scope.url, validLink: scope.validLink }});
                },function(error){

            });
    	}

        function getUrlInfoYoutube(id, url){

         $http({
                method: 'GET',
                 url:Config.youtubeDataApiUrl + id,
                
            })
            .success(function(success){
                try{

          
            scope.description=success.items[0].snippet.description;
            scope.title=success.items[0].snippet.title;
            scope.image=success.items[0].snippet.thumbnails.default.url;
            scope.url = url;
            scope.validLink = true;
            scope.execute({"data" : {image: scope.image, description: scope.description, title: scope.title, url: scope.url,validLink:scope.validLink}});
        }catch(e){
           
            scope.validLink=false;
            scope.execute({"data" : {validLink:scope.validLink}});
        }
                },function(error){

            });   
        }

        function getPlaneUrlInfo(url){

       


         var successCallback = function(success){
          
              if(success.data.share_image || success.data.share_title || success.data.share_description){
                    scope.description=success.data.share_description?success.data.share_description:'No Description';
                    scope.title=success.data.share_title?success.data.share_title:'No Title';
                    scope.image=success.data.share_image?success.data.share_image:'No Image';
                    scope.url = success.data.share_url;
                    scope.validLink = true;
                    scope.is_crawl=1;
                    scope.execute({"data" : {image: scope.image, description: scope.description, title: scope.title, url: scope.url,validLink:scope.validLink,is_crawl:1}});
            }else{
            scope.validLink=false;
            scope.is_crawl=0;
            scope.execute({"data" : {validLink:scope.validLink,is_crawl:0}});
        }
               
          }
          var errorCallback = function(err){
           
             
          } 
           sharedService.crawlApi(null,{crawl:url},successCallback,errorCallback);
        }




       function openBrowser(url){
        	window.open(url, '_system', 'location=yes');  return false;
       }

       function searchUrl(){
             //Should be fire when ng-change is fired
            var urls = scope.value.match(regExp);

            try{


            var link = new URL(urls[0]);

            if(link.host === Config.wwwyoutube || link.host === Config.youtube)
                getUrlInfoYoutube(link.searchParams.get("v"), urls[0].toLowerCase());
            else if(link.host === Config.wwwsoundcloud || link.host === Config.soundcloud)
                getUrlInfoSoundCloud(urls[0].toLowerCase());
            else
                getPlaneUrlInfo(urls[0].toLowerCase());
            }catch(e){
                
            }

            //If urls exists in the input string
            //if(urls)  getUrlInfo(angular.copy(urls[0].toLowerCase()));
       }
    }
  };
});

})(angular.module('talentNetworkApp'));