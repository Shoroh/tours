'use strict';

var app = angular.module('tours', []);

app.controller('ToursController', function($scope){
  $scope.master = {};
  $scope.backup = [];

  // CRUD
  function getIndex() {
    if (localStorage['tours']) {
      $scope.tours = angular.fromJson(localStorage.getItem('tours'));
    } else {
      $scope.tours = [];
    }
  }

  $scope.new = function () {
    toggleNewForm();
  }

  $scope.create = function(tour) {
    $scope.tours.push(angular.copy(tour))
    saveAll()
    toggleNewForm()
  };

  $scope.edit = function(index, tour) {
    $scope.backup[index] = angular.copy(tour)
    tour.state = 'edit';
  };

  $scope.update = function(tour) {
    tour.state = '';
    saveAll()
  };

  $scope.destroy = function(index) {
    $scope.tours.splice(index, 1);
    saveAll();
  };

  function saveAll() {
    localStorage.setItem('tours', angular.toJson($scope.tours));
  }

  // Form Helpers
  function reset() {
    $scope.tour = angular.copy($scope.master);
  };

  $scope.cancel = function(index) {
    $scope.tours[index] = angular.copy($scope.backup[index]);
    $scope.backup[index] = {};
  }

  $scope.cancelNew = function() {
    toggleNewForm();
  }

  function toggleNewForm() {
    $scope.showNewForm = !$scope.showNewForm
    reset();
  }

  getIndex();
  reset();
});
