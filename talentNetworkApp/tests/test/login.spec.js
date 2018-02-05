describe('login Controller', function() {

 var loginCtrl, $scope, $httpBackend, User, $httpBackend,testStore, Config, localStorage,accountService,
 responseCodeHandling,$ionicLoading,responseCodeHandling,Request;

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
$rootScope,$state,$injector,
      _accountService_,_localStorage_,_Config_,_testStore_,_Config_,_Request_,$ionicLoading,_responseCodeHandling_,$controller){
    $scope = $rootScope.$new();
    User = _accountService_;
   responseCodeHandling=_responseCodeHandling_;
    localStorage = _localStorage_;
    Config=_Config_;
    Request=_Request_;
   testStore=_testStore_;
   // responseCodeHandling=_responseCodeHandling_;
    controller = $controller('loginCtrl', {
      $scope: $scope
    });
    $httpBackend = $injector.get('$httpBackend');
    $ionicLoading= $injector.get('$ionicLoading');
    $cordovaToast = $injector.get('$cordovaToast');
    $cordovaDevice = $injector.get('$cordovaDevice');
    $ionicModal=$injector.get('$ionicModal');
    // facebookConnectPlugin=$injector.get('facebookConnectPlugin');
  }));

 it('loginObject:: should be Defined', function() {
   expect($scope.loginObject).toBeDefined();
    getHTMLFiles();
   
  });
 
  it(' login:: Should be a function ', function() {
   expect(angular.isFunction($scope. login)).toBe(true);
    getHTMLFiles();
   
  });
  it(' Forgot Password:: Should be a function ', function() {
    $scope.moveToForgotPassword();
   expect(angular.isFunction($scope. moveToForgotPassword)).toBe(true);
    getHTMLFiles();
   
  });
  it(' Register:: Should be a function ', function() {
     $scope.moveToRegister();
   expect(angular.isFunction($scope. moveToRegister)).toBe(true);
    getHTMLFiles();
   
  });



/*it(' Connect with Facebook:: Should be a function ', function() {
   $scope.connectWithFacebook();
   expect(angular.isFunction($scope.connectWithFacebook)).toBe(true);
    getHTMLFiles();
   
  });*/


   it('login :: called with valid data', function() {if(false){
    
    
  //  $scope.connectWithFacebook();
  //spyOn(User, 'login').andReturn(fakeHttpPromise);   
    $scope.login();

   
  $httpBackend.expect('POST',Config.apiURL + '/user/login',Request.LoginData).respond(testStore.loginResponse.success.response);
   
    getHTMLFiles();
   
}  });
it('login :: called with invalid data', function() {
   
    spyOn($scope,'login').and.callThrough();
    $scope.login();
   
    $httpBackend.expect('POST',Config.apiURL + '/user/login',Request.LoginDatainvalid).respond(testStore.loginResponse.error.response);
   
    getHTMLFiles();
   
  });
 
 /*   
//   });
*/
});
