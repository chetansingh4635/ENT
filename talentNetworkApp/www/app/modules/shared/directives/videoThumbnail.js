angular.module('talentNetworkApp').directive('videoThumbnail',function () {
				return{
				restrict : 'A',
				link: function (scope, element, attr) {
				var url = attr.url;
				var videoUrl = String(url.split('//').pop().split('/').pop());
				if(videoUrl.length != '11')
				var videoId=videoUrl.slice(videoUrl.length-11,videoUrl.length);
			    else 
			    var videoId= videoUrl;
				var thumbUrl = 'http://img.youtube.com/vi/'+videoId+'/mqdefault.jpg';
				element.attr('src', thumbUrl )
				}
				}
				});