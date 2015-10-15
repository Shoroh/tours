'use strict';

var app = angular.module('tours', []);

app.controller('MainController', function($scope){
  if (localStorage['tours']) {
    $scope.tours = JSON.parse(localStorage['tours']);
  } else {
    $scope.tours = [];
  }


  $scope.master = {};

  $scope.cancel = function() {
    $scope.toggleForm();
  }

  $scope.toggleForm = function() {
    $scope.showTheForm = !$scope.showTheForm
    $scope.reset();
  }

  $scope.newTour = function () {
    $scope.tourIsNew = true;
    $scope.toggleForm();
  }

  $scope.addOrUpdateTour = function() {
    if ($scope.tourIsNew) {
      $scope.tours.push(angular.copy($scope.tourForm))
    }
    localStorage['tours'] = JSON.stringify($scope.tours, function (key, val) {
                               if (key == '$$hashKey') {
                                   return undefined;
                               }
                               return val;
                            });
    $scope.toggleForm()
  };

  $scope.editTour = function(tour) {
    $scope.tourIsNew = false;
    $scope.showTheForm = true;
    $scope.tourForm = tour;
  };

  $scope.reset = function() {
    $scope.tourForm = angular.copy($scope.master);
  };

  $scope.reset();
});
