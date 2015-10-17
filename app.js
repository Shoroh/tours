'use strict';

var app = angular.module('tours', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/tours/index.html',
    controller: 'ToursController'
  })
  .when('/tours/:slug', {
    templateUrl: 'views/tours/show.html',
    controller: 'TourController'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
});

if (localStorage['tours']) {
  var allTours = angular.fromJson(localStorage.getItem('tours'));
} else {
  var allTours = [];
}
