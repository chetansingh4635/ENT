(function(app){

    app.service('mediaService',mediaService);

    mediaService.$inject = ['Config','$cordovaFileTransfer','loader', '$cordovaCamera','localStorage','$cordovaCapture', '$window','$cordovaToast'];

    function mediaService(Config,$cordovaFileTransfer,loader, $cordovaCamera, localStorage,$cordovaCapture, $window,$cordovaToast){

        this.uploadMedia = uploadMedia;

        this.getMediaFromCamera = getMediaFromCamera;

        function uploadMedia(media,type, successCallback, errorCallback){
            var ft = new FileTransfer();
            loader.show();
            var sessionId = localStorage.get('sessionId');

            //Media upload option object
            var options =new FileUploadOptions();
            options.mimeType = type === 'video' ? 'video/*' : 'image/*';
            // var fileNameIndex = media.lastIndexOf("/") + 1;
            // options.fileName = media.substr(fileNameIndex);
            options.headers = {'api-key':Config.apiKey, 'session-id':sessionId};

            ft.onprogress = function(progress){
                 if(type=='image' && progress.total >Config.maxImageSize )
                 {
                     ft.abort();
                    $cordovaToast.show(Config.largeImageMessage, 'short', 'bottom');
                 }
                 else if(type=='video' && progress.total >Config.maxVideoSize )
                 {
                     ft.abort();
                     $cordovaToast.show(Config.largeVideoMessage, 'short', 'bottom');
                 }
             }

             //Uploading object
             ft.upload(media, Config.mediaUpload, successCallback, errorCallback, options);

        }

        function getMediaFromCamera(type,source, captureSucess, captureError){
            var sourceType = source === 'camera' ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;
            var mediaType = type === 'video' ? Camera.MediaType.VIDEO : Camera.MediaType.PICTURE;
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: sourceType,
                mediaType: mediaType
            };

            if(source === 'camera' && type === 'video'){
                var options = { limit: 1, duration: 30 };

                navigator.device.capture.captureVideo(function(video){
                    if(video[0].size > Config.maxVideoSize)
                         $cordovaToast.show(Config.largeVideoMessage, 'short', 'bottom')
                    else
                        captureSucess(video[0].fullPath);

                },function(error){captureError(error)},options);
            }
            else
             navigator.camera.getPicture(captureSucess, captureError, options);                
            
        }

    }

})(angular.module('talentNetworkApp'));