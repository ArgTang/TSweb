angular
    .module('app', ['ui.router'])
    .run(['$rootScope', '$http', function ($rootScope, $http) {
            $http({method: 'GET', url: '/json/kurs.json'}).then(
                function (data) {
                    console.log(".run");
                    $rootScope.kursene = data.data;
            });
    }])

    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/hjem');

        $stateProvider
            .state('hjem', {
                url: '/hjem',
                templateUrl: 'htmltemplates/hjem.html'
            })

            .state('kurstilbud', {
                url: '/kurstilbud/:kursnavn',
                templateUrl: 'htmltemplates/kurstilbud.html',
                controller: 'kurscontroller'
            })
            .state('kurstilbud.pamelding', {
                url: '/pamelding'
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
        document.getElementById("left").style.height = ($rootScope.kursene.length*2 + 12) + 'rem';
        //loop for solving url and kursviewed ($scope.aktiv)
        if($stateParams.kursnavn === "") {
            $state.go('kurstilbud', {kursnavn: $rootScope.kursene[0].daddr}, {notify: false});
            $scope.aktiv = 0;
        } else {
            for(var i=0; i < $rootScope.kursene.length; i++) {
                if ($stateParams.kursnavn === $rootScope.kursene[i].daddr) {
                    $scope.aktiv = i;
                    console.log("stateparams");
                    console.log($stateParams);
                    if ($stateParams.pamelding != "")
                        $scope.visskjema= true;
                    break;
                }
            }
        }

        $scope.kursene = $rootScope.kursene;
        console.log($scope.kursene);

        $scope.hentskjema = function () {
            console.log("hentskjema");
        }
    }]);
