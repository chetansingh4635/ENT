(function(app){

    app.service('loader',loader);

    loader.$inject = ['$ionicLoading']

    function loader($ionicLoading){
        return{
            show:function(){
                $ionicLoading.show({ template: '<img class="loader" src="img/loader.gif"/>',
             noBackdrop: false});
            },
            hide:function(){
                $ionicLoading.hide();
            }
        }
    }

})(angular.module('talentNetworkApp'));