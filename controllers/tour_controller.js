angular.module('tours').controller('TourController', function ($scope, $routeParams) {

    angular.forEach(allTours, function (tour) {
        if ($routeParams.slug == tour.slug) {
            $scope.tour = tour;
        }
    });

    // Decorator
    $scope.imagePath = function (tour) {
        "use strict";
        if ( tour.image ) {
            return "/assets/images/tours/" + tour.image
        } else {
            return "http://placehold.it/100x100"
        }
    };

    $scope.countryTitle = function (tour) {
        "use strict";
        var country = allCountries.filter(function(country) {
            return country.id == tour.country;
        });
        return country? country[0].title : null
    };
});