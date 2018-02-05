describe('celebList', function() {
  var celebList, $scope, $rootScope, contactServices,celebrityService, $httpBackend, Config,loader,localStorage,responseCodeHandling;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,$injector,$controller,_celebrityService_,_Config_,_loader_, $ionicLoading){
  $scope=$rootScope.$new();
  celebrityService=_celebrityService_;
  Config=_Config_;
  loader=_loader_;
  
  celebList = $controller('celebList', {
   '$rootScope': $rootScope, '$scope': $scope
   
  });
   $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
}));
 



it('getCelebList:: should be defined', function() {
  $scope.getCelebList();
   expect(angular.isFunction($scope.getCelebList)).toBe(true);
   
    getHTMLFiles();
  
});


});
