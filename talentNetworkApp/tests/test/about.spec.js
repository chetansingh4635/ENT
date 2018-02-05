describe('homeCtrl', function() {
  var HomeCtrl, $scope, $rootScope, aboutServices, $httpBackend, Config, localStorage ;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,$injector,$controller,_aboutServices_, responseCodeHandling, $ionicLoading){
  $scope=$rootScope.$new();
  aboutServices=_aboutServices_;

  HomeCtrl = $controller('aboutCtrl', {
   '$rootScope': $rootScope, '$scope': $scope
   
  });
   $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
}));
 
it('init method:: should be defined', function() {
   expect(angular.isFunction($scope.init)).toBe(true);

   $scope.init();
    $scope.loader();
    getHTMLFiles();
  
});

it('getAboutUs:: should be defined', function() {
  $scope.getAboutUs();
  spyOn($scope,'getAboutUs').and.callThrough();
  $scope.successAboutUs(data);
  spyOn('$ionicLoading','hide');
   
   expect(angular.isFunction($scope.getAboutUs)).toBe(true);
    getHTMLFiles();
  
});
it('errorAboutUs:: should be defined', function() {
  $scope.errorAboutUs();
   expect(angular.isFunction($scope.errorAboutUs)).toBe(true);
    getHTMLFiles();
  
});







});
