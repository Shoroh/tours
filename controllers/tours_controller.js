angular.module('tours').controller('ToursController', ToursController);

function ToursController() {
    "use strict";
    var vm            = this;
    vm.tours          = [];
    vm.countries      = [];
    vm.sortReverse    = false;

    vm.changeReverse  = changeReverse;
    vm.imagePath      = imagePath;
    vm.countryTitle   = countryTitle;

    function init() {
        getCountries();
        getTours();
    }

    function getTours() {
        vm.tours = allTours;
    }

    function getCountries() {
        vm.countries = allCountries;
    }

    function changeReverse () {
        vm.sortReverse = !vm.sortReverse
    }

    // Decorator
    function imagePath (tour) {
        if ( tour.image ) {
            return "/assets/images/tours/" + tour.image
        } else {
            return "http://placehold.it/100x100"
        }
    }

    function countryTitle (tour) {
        var country = allCountries.filter(function(country) {
            return country.id == tour.country;
        });
        return country? country[0].title : null
    }

    init();
}
