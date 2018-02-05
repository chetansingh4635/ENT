(function (app) {
    app.service('localStorage', localStorage);
    localStorage.$inject = ['localStorageService'];
    function localStorage(localStorageService) {

        this.set = set;
        this.get = get;
        this.removeAll = removeAll;
        this.setAsync = setAsync;
        /*
         * Save the token
         */
        function set(key, value) {
            return localStorageService.set(key, value);
        }


        /*
         * Get the data
         */
        function get(key) {
            if (localStorageService.get(key)) {
                return localStorageService.get(key);
            } else {
                return 0;
            }
        }

        /*
         * Get the async data
         */
        function setAsync(key, value, callback) {
            return callback(localStorageService.set(key, value));
        }

        /*
         * removing all items from local storage
         */
        function removeAll() {
            return localStorageService.clearAll();
        }
    }
})(angular.module('talentNetworkApp'));
