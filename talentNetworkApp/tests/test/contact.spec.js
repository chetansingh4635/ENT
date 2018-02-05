describe('contactCtrl', function() {
  var contactCtrl, $scope, $rootScope, contactServices, $httpBackend, Config, localStorage,responseCodeHandling;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,$injector,$controller,_contactServices_,_responseCodeHandling_, $ionicLoading){
  $scope=$rootScope.$new();
 responseCodeHandling=_responseCodeHandling_;
contactServices=_contactServices_;
  contactCtrl = $controller('contactCtrl', {
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

it('getContactUs:: should be defined', function() {
     expect(angular.isFunction($scope.getContactUs)).toBe(true);
    $scope.getContactUs();
    responseCodeHandling.showMessages(data);
    spyOn($scope,'getContactUs').callFake(successGetContactUs(data));
    getHTMLFiles();
  
});
it('errorGetContactUs:: should be defined', function() {
  $scope.errorGetContactUs();
  spyOn($scope,'errorGetContactUs').and.callThrough();
   expect(angular.isFunction($scope.errorGetContactUs)).toBe(true);
    getHTMLFiles();
  
});

});
