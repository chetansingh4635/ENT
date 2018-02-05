//Shared directives

(function(app){
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                  console.log(attrs.ngEnter);
                    scope.$eval(attrs.ngEnter);

            cordova.plugins.Keyboard.close();
          
                });
 
                event.preventDefault();
            }
           
        })
    }

})
})(angular.module('talentNetworkApp'));