angular
    .module('app', ['ui.router'])
    .run(function($rootScope, Kursene){Kursene.getKurs().then(function (data) { //call fttp factory and injects into $scope
            console.log(".run");
            $rootScope.kursene = data;
    });})

    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        console.log("start");
        $urlRouterProvider.otherwise(''); //default

        $stateProvider
            .state('hjem', {
                url: '',
                templateUrl: 'htmltemplates/hjem.html'
            })

            .state('kurstilbud', {
                url: 'kurstilbud/{navn}',
                templateUrl: 'htmltemplates/kurstilbud.html',
                controller: 'kurscontroller',
            }})

            .state('utådanse', {
                url: '/utådanse',
                templateUrl: 'htmltemplates/utådanse.html'
            })
            .state('omoss', {
                url: '/omoss',
                templateUrl: 'htmltemplates/omoss.html'
            });
    }]);

/*---------------- kurscontroller-----------------------*/

angular
    .module('app')
    .controller('kurscontroller', ['$scope', '$rootScope', function ($scope, $rootScope) {
        console.log("kurscontroller");

        //init
        $scope.aktiv = 0; //default kursselector
        $scope.kursene = $rootScope.kursene
        console.log($scope.kursene);

        $scope.menyklikk = function (nummer) {
            // function for changing shown kurs
            console.log("menyklikk");
            $scope.aktiv = nummer;;
        };

        $scope.hentskjema = function () {
            //function for showing påmeldings popup
            console.log("hentskjema");
        };
    }]);

/*------------------- Kursene factory ($http) ----------------------*/

angular //http request instance
    .module('app')
    .factory('Kursene', ['$http', function($http) {
        return {
            getKurs: function () { // log to console before returning data
                return $http.get('json/kurs.json').then(function (response) {
                    console.log("kursene factory: "); return response.data; });}};
    }]);
