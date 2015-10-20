angular.module('tours').controller('AdminCountriesController', AdminCountriesController);

function AdminCountriesController() {
    "use strict";
    var vm         = this;
    vm.country     = {};
    vm.countries   = [];
    vm.showNewForm = false;

    vm.newCountry       = newCountry;
    vm.createCountry    = createCountry;
    vm.editCountry      = editCountry;
    vm.updateCountry    = updateCountry;
    vm.destroyCountry   = destroyCountry;
    vm.cancelCountry    = cancelCountry;
    vm.cancelNewCountry = cancelNewCountry;

    var masterCountry = {};
    var backupCountry = [];

    // CRUD
    function init () {
        reset();
        getCountries();
    }

    function getCountries () {
        vm.countries = allCountries;
    }

    function newCountry () {
        toggleNewForm();
    }

    function createCountry (country) {
        country.id    = allCountries.length + 1;
        country.state = 'idle';
        vm.countries.push(angular.copy(country));
        saveAll();
        toggleNewForm()
    }

    function editCountry (index, country) {
        backupCountry[index] = angular.copy(country);
        country.state        = 'edit';
    }

    function updateCountry (country) {
        country.state = 'idle';
        saveAll()
    }

    function destroyCountry (index) {
        vm.countries.splice(index, 1);
        saveAll();
    }

    function saveAll() {
        localStorage.setItem('countries', angular.toJson(vm.countries));
    }

    // Form Helpers
    function reset() {
        vm.country = angular.copy(masterCountry);
    }

    function cancelCountry (index) {
        vm.countries[index]  = angular.copy(backupCountry[index]);
        backupCountry[index] = {};
    }

    function cancelNewCountry () {
        toggleNewForm();
    }

    function toggleNewForm() {
        vm.showNewForm = !vm.showNewForm;
        reset();
    }

    init();
}
