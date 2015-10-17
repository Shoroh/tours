angular.module('tours').controller('ToursController', function ($scope) {
    // CRUD
    function getIndex() {
        $scope.tours        = allTours;
        $scope.countries    = allCountries;
        $scope.sortReverse  = false;
    }

    $scope.changeReverse = function () {
        "use strict";
        $scope.sortReverse = !$scope.sortReverse
    };

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

    getIndex();
});
