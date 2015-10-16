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
    toggleForm();
  }

  function toggleForm() {
    $scope.showTheForm = !$scope.showTheForm
    reset();
  }

  $scope.newTour = function () {
    $scope.tourIsNew = true;
    toggleForm();
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
    toggleForm()
  };

  $scope.editTour = function(tour) {
    $scope.tourIsNew = false;
    $scope.showTheForm = true;
    $scope.tourForm = tour;
  };

  function reset() {
    $scope.tourForm = angular.copy($scope.master);
  };

  reset();
});
