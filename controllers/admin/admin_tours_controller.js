angular.module('tours').controller('AdminToursController', AdminToursController);

function AdminToursController() {
    "use strict";
    var vm         = this;
    vm.tour        = {};
    vm.tours       = [];
    vm.countries   = [];
    vm.showNewForm = false;

    vm.newTour       = newTour;
    vm.createTour    = createTour;
    vm.editTour      = editTour;
    vm.updateTour    = updateTour;
    vm.destroyTour   = destroyTour;
    vm.cancelTour    = cancelTour;
    vm.cancelNewTour = cancelNewTour;
    vm.imagePath     = imagePath;
    vm.countryTitle  = countryTitle;

    var masterTour = {};
    var backupTour = [];

    // CRUD
    function init () {
        reset();
        getCountries();
        getTours();
    }

    function getTours () {
        vm.tours = allTours;
    }

    function getCountries () {
        vm.countries = allCountries;
    }

    function newTour () {
        toggleNewForm();
    }

    function createTour (tour) {
        tour.slug    = tour.slug || 'default_slug';
        tour.country = tour.country || 0;
        tour.state   = 'idle';
        vm.tours.push(angular.copy(tour));
        saveAll();
        toggleNewForm()
    }

    function editTour (index, tour) {
        backupTour[index] = angular.copy(tour);
        tour.state        = 'edit';
    }

    function updateTour (tour) {
        tour.state = 'idle';
        saveAll()
    }

    function destroyTour (index) {
        vm.tours.splice(index, 1);
        saveAll();
    }

    function saveAll() {
        localStorage.setItem('tours', angular.toJson(vm.tours));
    }

    // Form Helpers
    function reset() {
        vm.tour = angular.copy(masterTour);
    }

    function cancelTour (index) {
        vm.tours[index]   = angular.copy(backupTour[index]);
        backupTour[index] = {};
    }

    function cancelNewTour () {
        toggleNewForm();
    }

    function toggleNewForm() {
        vm.showNewForm = !vm.showNewForm;
        reset();
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
        return country[0]? country[0].title : 'Unknown'
    }

    init();
}
