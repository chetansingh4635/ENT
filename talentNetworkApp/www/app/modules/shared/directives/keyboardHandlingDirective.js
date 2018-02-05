angular.module('talentNetworkApp').directive('focus', function () {
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            elem.bind('keydown', function (e) {
                elem.next()[0].focus();

            });
             
        }
    }
})
