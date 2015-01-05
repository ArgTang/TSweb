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
            .state('hjem', { //if Hjem, insert hjem
                url: '',
                templateUrl: 'htmltemplates/hjem.html'
            })

            .state('kurstilbud', {
                url: 'kurstilbud/{navn}',
                templateUrl: 'htmltemplates/kurstilbud.html',
                controller: 'kurscontroller',
                resolve: {
                    //promiseKurs: function ($http) {console.log("resolve"); return $http({method: 'GET', url: '/json/kurs.json'})}}
                    //promiseKurs: function (Kursene) {console.log("resolve");return Kursene.getItems().then(function (response) {return response.data;});}
            }})
/*
            .state('kurstilbud', {
                url: '/kurstilbud',
                templateUrl: 'htmltemplates/kurstilbud.html',
                controller: 'kurscontroller'
            })
            .state('kurstilbud.navn', {
                url: '/kurstilbud/{navn}',
                controller: 'kurscontroller'
            })
*/

            .state('utådanse', {
                url: '/utådanse',
                templateUrl: 'htmltemplates/utådanse.html'
            })
            .state('omoss', {
                url: '/omoss',
                templateUrl: 'htmltemplates/omoss.html'
            });
    }]);

angular
    .module('app')
    .controller('kurscontroller', ['$scope', /*'promiseKurs', */'$rootScope', function ($scope, /*promiseKurs,*/ $rootScope) {
        console.log("kurscontroller");
        $scope.aktiv = 0;
        //$scope.kursene = promiseKurs.data;
        $scope.kursene = $rootScope.kursene
        console.log($scope.kursene);
        $scope.menyklikk = function (nummer) {
            console.log("nummer " + nummer);
            $scope.aktiv = nummer;
            console.log("aktiv " + $scope.aktiv);
        };

/*        Kursene.getKurs().then(function (data) { //call fttp factory and injects into $scope
            console.log("getKurs()"); $scope.kursene = data;
            });*/

        $scope.hentskjema = function () {
            console.log("hentskjema");
        };
    }]);

angular //http request instance
    .module('app')
    .factory('Kursene', ['$http', function($http) {
        return {
            getKurs: function () {
                return $http.get('/json/kurs.json').then(function (response) {
                    console.log("kursene factory: ");console.log(response);
                    return response.data; });}};
    }]);
