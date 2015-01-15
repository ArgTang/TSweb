angular
    .module('app', ['ui.router'])
    .run(
        function ($rootScope, $http) {
            $http({method: 'GET', url: '/json/kurs.json'}).then(
                function (data) {
                    console.log(".run");
                    $rootScope.kursene = data.data;
            });
    })

    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/hjem'); //default

        $stateProvider
            .state('hjem', {
                url: '/hjem',
                templateUrl: 'htmltemplates/hjem.html'
            })

            .state('kurstilbud', {
                url: '/kurstilbud/:kursnavn', ///:pamelding',
                templateUrl: 'htmltemplates/kurstilbud.html',
                controller: 'kurscontroller'
            })

            .state('utadanse', {
                url: '/utadanse',
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
    .controller('kurscontroller', ['$scope', '$rootScope', '$stateParams', '$state', function ($scope, $rootScope, $stateParams, $state) {
        console.log("kurscontroller");


        //loop for svolving url
        if($stateParams.kursnavn === "") {
            $state.go('kurstilbud', {kursnavn: $scope.kursene[0].daddr})
            $scope.aktiv = 0;
            console.log("3: "+$scope.aktiv);
        } else {
            for(var i=0; i < $rootScope.kursene.length; i++) {
                if ($stateParams.kursnavn === $rootScope.kursene[i].daddr) {
                    console.log(i);
                    $scope.aktiv = i;
                    break;
                }
            }
        }

        $scope.kursene = $rootScope.kursene;
        console.log($scope.kursene);

        $scope.hentskjema = function () {
            console.log("hentskjema");
        };
    }]);
