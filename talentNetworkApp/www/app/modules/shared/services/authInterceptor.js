(function(app){
    app.service('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['localStorage','Config'];

    function authInterceptor(localStorage, Config){
        return{
		request: function(config){

			//loader.show();
			if(config.url.indexOf(Config.commonUrl) != 0)
				{
					config.headers={}
					return config;
				}
			var sessionId = localStorage.get('sessionId');
			if(sessionId){
				config.headers['session-id']=sessionId;
				config.timeout = 10000;
			}
            config.headers['Content-type'] = 'application/json';
            config.headers['api-key'] =  Config.apiKey;
			return config;
		},
		response: function(response){
			//loader.hide();
			return response;
		}
	}
}
})(angular.module('talentNetworkApp'));
