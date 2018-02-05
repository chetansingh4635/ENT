(function(app){
    app.controller('eventCtrl',eventCtrl);

    eventCtrl.$inject = ['$scope','eventServices','Config','loader'];

    function eventCtrl($scope, eventServices,Config, loader){

        
       $scope.events=[];
      
       $scope.geteventList=function(){
     
          // loader.show();
      
          var success=function(response){
            loader.hide();
           
           
           
          $scope.events=response.data;
            
             }
          
          var error=function(err){
            loader.hide();
           
          }
          eventServices.eventList(null,null,success,error);
        }

         $scope.getEventInfo=function(){
     
          // loader.show();
         
          var params={event_id:$state.params.event_id}
         
          var success=function(response){
            loader.hide();
           
           
           
          $scope.description=response.data;
            
             }
          
          var error=function(err){
            loader.hide();
           
          }
          eventServices.eventDescription({event_id:2},null,success,error);
        }
  }
})(angular.module('talentNetworkApp'));