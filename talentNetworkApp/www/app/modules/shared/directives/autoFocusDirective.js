// angular.module('talentNetworkApp').directive('onFocus', function () {
// 					 return function($scope,$element) {
// 					    $element[0].focus();
// 							}
// });

angular.module('talentNetworkApp').directive('focusMe',function () {
  return {
  	restrict: 'A',
    link: function (scope,element,attrs) { 
            cordova.plugins.Keyboard.show(); //open keyboard manually
    }
  };
});