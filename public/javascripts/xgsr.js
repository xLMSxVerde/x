var app = angular.module('xgsr', ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/informations", {
        templateUrl : 'partials/informations'
    })
    .when("/results", {
        templateUrl : 'partials/results'
    })
    .when("/standings", {
        templateUrl : 'partials/standings'
    })
    .otherwise({
        templateUrl : 'partials/events'
    });
});
