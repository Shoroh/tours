angular.module('tours').controller('AdminToursController', function ($scope) {
    $scope.master = {};
    $scope.backup = [];

    // CRUD
    function getIndex() {
        $scope.tours = allTours;
        $scope.countries = COUNTRIES;
    }

    $scope.new = function () {
        toggleNewForm();
    };

    $scope.create = function (tour) {
        $scope.tours.push(angular.copy(tour));
        saveAll();
        toggleNewForm()
    };

    $scope.edit = function (index, tour) {
        $scope.backup[index] = angular.copy(tour);
        tour.state = 'edit';
    };

    $scope.update = function (tour) {
        tour.state = '';
        saveAll()
    };

    $scope.destroy = function (index) {
        $scope.tours.splice(index, 1);
        saveAll();
    };

    function saveAll() {
        localStorage.setItem('tours', angular.toJson($scope.tours));
    }

    // Form Helpers
    function reset() {
        $scope.tour = angular.copy($scope.master);
    }

    $scope.cancel = function (index) {
        $scope.tours[index] = angular.copy($scope.backup[index]);
        $scope.backup[index] = {};
    };

    $scope.cancelNew = function () {
        toggleNewForm();
    };

    function toggleNewForm() {
        $scope.showNewForm = !$scope.showNewForm;
        reset();
    }

    // Decorator
    $scope.imagePath = function(tour) {
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
    reset();
});
