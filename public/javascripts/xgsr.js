var app = angular.module('xgsr', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/fmView", {
        templateUrl : 'partials/fmView'
    })
    .when("/pcView", {
        templateUrl : 'partials/pcView'
    })
    .when("/statView", {
        templateUrl : 'partials/statView'
    })
    .when("/old", {
        templateUrl : 'partials/old'
    })
    .otherwise({
        templateUrl : 'partials/events'
    });
});
