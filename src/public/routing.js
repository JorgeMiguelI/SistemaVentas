var app= angular.module('app', ['ngRoute']);
app.config(function ($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homecontroller'

    })
    .otherwise({
        // when all else fails
        templateUrl: 'Pages/routeNotFound.html',
        controller: 'notFoundController'
        });
});

app.controller('homecontroller', function($scope){

    $scope.data= [{nombre: 'Jorge'}, {nombre: "Miguel"}];

    $scope.agrega=function(){
        $scope.data.push({nombre: "Andres"})
    }

});