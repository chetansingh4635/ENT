describe('profileCtrl', function() {
  var profileCtrl, $scope, $rootScope, contactServices, $httpBackend, Config, localStorage,responseCodeHandling;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,$injector,$controller, $state, $ionicPopup){
  $scope=$rootScope.$new();


  profileCtrl = $controller('profileCtrl', {
   '$rootScope': $rootScope, '$scope': $scope
   
  });
   $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
}));
 
it('openUploadMediaPopUp method:: should be defined', function() {
   expect(angular.isFunction($scope.openUploadMediaPopUp)).toBe(true);

   $scope.openUploadMediaPopUp();
   //expect(browser().location().url()).toBe("/index.html");
    getHTMLFiles();
  
});

it('openUploadAudioPopUp:: should be defined', function() {
  $scope.openUploadAudioPopUp();
  
  //$scope.successAboutUs(data);
   expect(angular.isFunction($scope.openUploadAudioPopUp)).toBe(true);
    getHTMLFiles();
  
});
it('openUploadTextPopUp:: should be defined', function() {
  $scope.openUploadTextPopUp();
   expect(angular.isFunction($scope.openUploadTextPopUp)).toBe(true);
    getHTMLFiles();
  
});







});
