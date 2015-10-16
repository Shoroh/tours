'use strict';

var app = angular.module('tours', []);

app.controller('MainController', function($scope){
  if (localStorage['tours']) {
    $scope.tours = JSON.parse(localStorage['tours']);
  } else {
    $scope.tours = [];
  }

  $scope.master = {};

  $scope.newTour = function () {
    $scope.tourIsNew = true;
    toggleNewForm();
  }

  $scope.create = function(tour) {
    $scope.tours.push(angular.copy($scope.tour))
    save(tour)
    toggleNewForm()
  };

  $scope.editTour = function(tour) {
    tour.state = 'edit';
    $scope.tourForm = tour;
  };

  $scope.update = function(tour) {
    tour.state = '';
    save(tour)
  };

  function save(tour) {
    localStorage['tours'] = JSON.stringify($scope.tours, function (key, val) {
                               if (key == '$$hashKey') {
                                   return undefined;
                               }
                               return val;
                            });
  }

  function reset() {
    $scope.tour = angular.copy($scope.master);
  };

  $scope.cancel = function(tour) {
    tour.state = '';
  }

  $scope.cancelNew = function() {
    toggleNewForm();
  }

  function toggleNewForm() {
    $scope.showTheForm = !$scope.showTheForm
    reset();
  }

  reset();
});
