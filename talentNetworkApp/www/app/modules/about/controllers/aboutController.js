(function (app) {
    app.controller('aboutCtrl', aboutCtrl);
    aboutCtrl.$inject = ['$scope', 'aboutServices', 'responseCodeHandling', '$ionicLoading'];

    function aboutCtrl($scope, aboutServices, responseCodeHandling, $ionicLoading) {

        $scope.init = function () {
            getAboutUs();
        }

        /*
         * loader is used to indicate activity while blocking user interaction.
         */
        function loader() {
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner>',
            });
        }

        var getAboutUs = function () {
          loader();
            var successAboutUs = function (response) {
                $ionicLoading.hide();
                responseCodeHandling.showMessages(response.code, response.message,false, function (status, msg) {
                    if (status) {
                        $scope.aboutUs = response.data;
                    } else {
                        console.log("message from service  error", msg);
                    }
                });
            }
            var errorAboutUs = function (error) {
                $ionicLoading.hide();
                //$cordovaToast.show('Something went wrong.Please try again!', 'short', 'bottom');
            }
            aboutServices.getAboutUs(null, null, successAboutUs, errorAboutUs);
        }
         
    }
})(angular.module('talentNetworkApp'));
