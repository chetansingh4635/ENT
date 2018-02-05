describe('Signup Controller', function() {

 var oginCtrl, $scope, $httpBackend, User,controller, $httpBackend, Config,testStore,localStorage,accountService,
 responseCodeHandling,$ionicLoading;

  function getHTMLFiles() {
   $httpBackend.when('GET', 'templates/home.html').respond(true);
    $httpBackend.when('GET', 'templates/login.html').respond(true);
    $httpBackend.when('GET', 'templates/signUp.html').respond(true);
    $httpBackend.when('GET', 'templates/signupCategory.html').respond(true);
    $httpBackend.when('GET', 'templates/signupGroup.html').respond(true);
    $httpBackend.when('GET', 'templates/signupindividual.html').respond(true);


    };

//beforeEach(module('ngCordova'));
  beforeEach(module('talentNetworkApp'));
  beforeEach(inject(function(
$rootScope,$state,_accountService_,_Config_,_testStore_, loader,$controller,$injector){
    $scope = $rootScope.$new();
    User = _accountService_;
   Config=_Config_;
   testStore=_testStore_;
   ;
   // responseCodeHandling=_responseCodeHandling_;
    controller = $controller('signupCtrl', {
      $scope: $scope
    });
    $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
    
  }));

 it('getInitialLists:: should be Defined', function() {

   expect($scope.getInitialLists).toBeDefined();
    getHTMLFiles();
   
  });
 it(' getInitialLists:: Should be a function ', function() {
     $scope.getInitialLists();
   expect(angular.isFunction($scope.getInitialLists)).toBe(true);
    getHTMLFiles();
   
  });
 
 it(' getCategories:: Should be a function ', function() {
    $scope.getCategories();
    
   expect(angular.isFunction($scope.getCategories)).toBe(true);
    getHTMLFiles();
   
  });
 
 
 it('  addRemoveTalent:: Should be a function ', function() {
    $scope.addRemoveTalent();
   expect(angular.isFunction( $scope.addRemoveTalent)).toBe(true);
    getHTMLFiles();
   
  });
 

 
 it('moveToSignUpSubmit:: Should be a function ', function() {
    $scope.moveToSignUpSubmit();
   expect(angular.isFunction( $scope.moveToSignUpSubmit)).toBe(true);
    getHTMLFiles();
   
  });

 it('moveToChooseRole:: Should be a function ', function() {
    $scope.moveToChooseRole();
   expect(angular.isFunction( $scope.moveToChooseRole)).toBe(true);
    getHTMLFiles();
   
  });

 it('signup:: Should be a function ', function() {
    $scope.signup();
   expect(angular.isFunction( $scope.signup)).toBe(true);
    getHTMLFiles();
   
  });

  it('signup :: called with valid data', function() {
    spyOn($scope,'signup').and.callThrough();
    $scope.signup();
    spyOn($scope,'successCallback').and.callThrough();
    $scope.successCallback();
  $httpBackend.expect('POST',Config.apiURL + '/user/signup',dataToSend).respond(testStore.signupResponse.success.response);
    
    getHTMLFiles();
   
  });
  it('signup :: called with invalid data', function() {
    spyOn($scope,'signup').and.callThrough();
    $scope.signup();
    spyOn($scope,'errorCallback').and.callThrough();
     $scope.errorCallback();
     $httpBackend.expect('POST',Config.apiURL + '/user/signup',Config.dataToSend).respond(testStore.signupResponse.error.response);
    
    getHTMLFiles();
   
  });

});
