angular.module('tours').controller('AdminCountriesController', function ($scope) {
    $scope.master = {};

    // CRUD
    function getIndex() {
        $scope.countries = allCountries;
    }

    $scope.new = function () {
        toggleNewForm();
    };

    $scope.create = function (country) {
        country.id = allCountries.length + 1;
        $scope.countries.push(angular.copy(country));
        saveAll();
        toggleNewForm()
    };

    $scope.edit = function (index, country) {
        country.state = 'edit';
    };

    $scope.update = function (country) {
        country.state = '';
        saveAll()
    };

    $scope.destroy = function (index) {
        $scope.countries.splice(index, 1);
        saveAll();
    };

    function saveAll() {
        localStorage.setItem('countries', angular.toJson($scope.countries));
    }

    // Form Helpers
    function reset() {
        $scope.country = angular.copy($scope.master);
    }

    $scope.cancel = function (country) {
        country.state = '';
    };

    $scope.cancelNew = function () {
        toggleNewForm();
    };

    function toggleNewForm() {
        $scope.showNewForm = !$scope.showNewForm;
        reset();
    }

    getIndex();
    reset();
});
