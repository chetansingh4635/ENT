//directive for maxlength

(function(app){
	app.directive('customMaxLength', customMaxLength);

	function customMaxLength(){
		return {
			restrict: 'AE',
			require: ngModel,
			 scope: {
           		'custom-max-length': '=custom-max-length',
            	ngModel: '=ngModel'
        	},
			link:function(scope, element, atts,ngModel){

				scope.$watch('ngModel', function(newValue, oldValue){
					scope.ngModel = scope.ngModel.toString().length > scope.custom-max-length ? oldValue : newValue;
				})

			}
		}
	}
})