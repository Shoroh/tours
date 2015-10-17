'use strict';

angular.module('tours').controller('TourController', function($scope, $routeParams){
  console.log($routeParams.slug);

  angular.forEach(allTours, function(tour){
    if ($routeParams.slug == tour.slug) {
      $scope.tour = tour;
    }
  });
});
