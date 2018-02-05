angular.module('talentNetworkApp').filter('formatDate',function(){

	return function(date){
		if(!angular.isUndefined(date)){
			return moment(date).format("DD-MMMM-YYYY | hh:mm A");
		}
	}
})
.filter("trustUrl", ['$sce', function ($sce) {
        return function (recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }])
.filter("formatTime",function(){
	return function(date){
		if(!angular.isUndefined(date)){
			return moment(date).format("DD-MMMM-YYYY");
		}
	}
})

.filter("toUpperCase", function(){
	return function(string){
		string = string.toUpperCase();
		return string;
	}
})

.filter("extractFileName", function(){
	return function(filePath){
		var fileNameIndex = filePath.lastIndexOf("/") + 1;
        return filePath.substr(fileNameIndex);
	}
})
.filter("findVideoPreview", function(){
	return function(filePath){
		var url=filePath.slice((filePath.substring(0,filePath.lastIndexOf("."))).length+1,filePath.length);
        var urlExtension1=filePath.slice((filePath.substring(0,filePath.lastIndexOf("/"))).length,filePath.length);
        var urlExtension2=urlExtension1.replace('mp3','png');
		// if(url=='mp3'){
		// 	var audio_url1=filePath.substring(0,filePath.lastIndexOf("/"));
		//     var audio_url2=audio_url1.substring(0,audio_url1.lastIndexOf("/"));
		//     var audio_url=audio_url2+"/fl_waveform"+urlExtension2;
		//     return audio_url;
		// }
		var imagePath = filePath.substring(0, filePath.lastIndexOf(".")) + '.png';
		return imagePath;
	}
}).filter("GetYouTubeID", function ($sce) {
  return function (text) {
      var video_id = text.split('v=')[1].split('&')[0];
      return video_id;
  }
}).filter("soundFormatTime",function(){
	return function(date){
		if(!angular.isUndefined(date)){
			return moment(date).format("hh:mm A");
		}
	}
}).filter("timeInterval",function(){
	return function(date){
		if(!angular.isUndefined(date)){
			return moment(date).fromNow();
		}
	}
});;
