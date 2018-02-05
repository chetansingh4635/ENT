describe('homeCtrl', function() {
  var HomeCtrl, $scope, $rootScope, homeServices, $httpBackend, Config, localStorage ;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,_homeServices_,$injector,$controller){
  $scope=$rootScope.$new();
  homeServices=_homeServices_;

  HomeCtrl = $controller('homeCtrl', {
   '$rootScope': $rootScope, '$scope': $scope
   
  });
   $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
}));
 
it('Data Formater:: should be defined', function() {
   expect(angular.isFunction($scope.dateFormater)).toBe(true);
   $scope.dateFormater();
    getHTMLFiles();
  
});

it('init:: should be defined', function() {
  $scope.init();
   expect(angular.isFunction($scope.init)).toBe(true);
    getHTMLFiles();
  
});






});
