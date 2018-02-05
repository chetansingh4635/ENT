describe('celebInviteCtrl', function() {
  var profileCtrl, $scope, $rootScope, contactServices,Request,celebrityService,testStore, $httpBackend, Config,loader,localStorage,responseCodeHandling;
 beforeEach(module('talentNetworkApp'));
 

  function getHTMLFiles() {
	$httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);

		};

beforeEach(inject(function($rootScope,$injector,$controller,_Request_,_testStore_,_celebrityService_,_Config_,_loader_,_responseCodeHandling_, $ionicLoading){
  $scope=$rootScope.$new();
  celebrityService=_celebrityService_;
  Config=_Config_;
  loader=_loader_;
  Request=_Request_;
  testStore=_testStore_;
  responseCodeHandling=_responseCodeHandling_;
  profileCtrl = $controller('celebInviteCtrl', {
   '$rootScope': $rootScope, '$scope': $scope
   
  });
   $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
}));
 

it('celebInviteObject:: should be defined', function() {
   expect($scope.celebInviteObject).toBe(true);
    
  
});
it('successCallback:: should be defined', function() {
  $scope.successCallback();
   expect(angular.isFunction($scope.successCallback)).toBe(true);
    getHTMLFiles();
  
});

it('errorCallback:: should be defined', function() {
  $scope.errorCallback();
   expect(angular.isFunction($scope.errorCallback)).toBe(true);
    getHTMLFiles();
  
});
it('sendCelebInvite:: should be defined', function() {
  $scope.sendCelebInvite();
   spyOn($scope,'sendCelebInvite').and.callThrough();
   expect(angular.isFunction($scope.sendCelebInvite)).toBe(true);
   $httpBackend.expect('POST',Config.apiURL + '/celebrityInvite',Request.dataToSend).respond(testStore.CelebrityinviteResponse.success.response);
    getHTMLFiles();
  
});







});
