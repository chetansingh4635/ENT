(function(app){
    app.controller('searchCtrl',searchCtrl);

    searchCtrl.$inject = ['$scope','searchServices','Config','loader','responseCodeHandling','$ionicHistory','$cordovaInAppBrowser'];

    function searchCtrl($scope, searchServices,Config, loader,responseCodeHandling,$ionicHistory,$cordovaInAppBrowser)
    {
              $scope.users=[];
              $scope.talents=[];
              $scope.events=[];
              $scope.TextPost=[];
              $scope.like=true;
               var d = document.getElementsByTagName("ion-side-menu-content");
              d[0].className = d[0].className.replace(" left-sidemenu-content"," ");
               $scope.openNewWindow=function(url){
                var options = {
                    location: 'yes',
                    clearcache: 'yes',
                    toolbar: 'no'
                  };
                $cordovaInAppBrowser.open(url, '_blank', options)
                  .then(function(event) {
                    // success
                  })
                  .catch(function(event) {
                    // error
                  });
             }
              $scope.getSearch=function(){
          
              loader.show();
                $scope.users=[];
                $scope.talents=[];
                $scope.events=[];
                $scope.TextPost=[];
              var dataToSend={'query':$scope.name}
              
              var success=function(response){
                loader.hide();
               
                   $scope.users=response.data.Users;
                    angular.forEach($scope.users, function() {
                        if( $scope.users.profile_pic_path){
                         var profile_pic_path= $scope.users.profile_pic_path;
                         var b2='f_auto,q_100,w_100';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.users.profile_pic_path=output2;
                         
                        }
                 });
                 $scope.talents=response.data.Talents;
                 $scope.events=response.data.Events;
                 $scope.TextPost=response.data.TextPost;
                     angular.forEach($scope.TextPost, function() {
                        if( $scope.TextPost.profile_pic_path){
                         var profile_pic_path= $scope.TextPost.profile_pic_path;
                         var b2='f_auto,q_100,w_100';
                         var n2 = profile_pic_path.indexOf("upload/");
                         var output2 = [profile_pic_path.slice(0, n2+7), b2, profile_pic_path.slice(n2+18)].join('');
                         $scope.TextPost.profile_pic_path=output2;
                         
                        }
                 });
                                
          }
          
          var error=function(err){
            loader.hide();
           
          }
          searchServices.searchResult(null,dataToSend,success,error);
        }


 
                $scope.fun_Unfan=function(user){
                           if($scope.like){                     
                           var status=user.fan_status?"celeb_unfan":"celeb_fan";
                         
                          var dataToSend={
                            'id':user.user_id,
                            'status':status
                          }
                          user.user_fans=user.fan_status? parseInt(user.user_fans)-1 :parseInt(user.user_fans) +1;
                           user.fan_status = !user.fan_status;
                           $scope.like=false;
                          var success=function(response){
                            $scope.like=true;
                            responseCodeHandling.showMessages(response.code,null,false,function(status){
                            if(status){
                              // user.fan_status = !user.fan_status;
                              // user.user_fans = response.data.newFansCount;
                              
                             }
                          });
                        }
                          var error=function(err){
                             $scope.like=true;
                               user.user_fans=user.fan_status? parseInt(user.user_fans)+1 :parseInt(user.user_fans) -1;
                               user.fan_status = !user.fan_status;                         
                          }
                       
                          searchServices.fan_unfanuser(null, dataToSend, success, error);
                        }
                        else{}
                      }
                         
  }
})(angular.module('talentNetworkApp'));