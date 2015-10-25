angular.module('tours').controller('AdminCountriesController', AdminCountriesController);

AdminCountriesController.$inject = ['$resource'];

function AdminCountriesController(resource) {
    "use strict";
    var vm         = this;
    vm.newCountry  = {};
    vm.countries   = [];
    vm.showNewForm = false;

    vm.toggleNewForm    = toggleNewForm;
    vm.createCountry    = createCountry;
    vm.editCountry      = editCountry;
    vm.updateCountry    = updateCountry;
    vm.destroyCountry   = destroyCountry;
    vm.cancelCountry    = cancelCountry;
    vm.cancelNewCountry = cancelNewCountry;

    var backupCountry = [];

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Country = resource('https://api.parse.com/1/classes/Country/:objectId',
        {objectId: '@objectId'},
        {
            query: {isArray: true, transformResponse: parseResults},
            update: {isArray: false, method: 'PUT'}
        }
    );

    // CRUD
    function init () {
        reset();
        vm.countries = Country.query();
    }


    function createCountry (country) {
        country.state = 'idle';
        var countryToServer = new Country(country);
        countryToServer.$save().then(
            function(country) {
                var countryFromServer = angular.extend(country, vm.newCountry);
                vm.countries.push(countryFromServer);
                vm.newCountry = {};

            }
        );
        toggleNewForm()
    }

    function editCountry (index, country) {
        backupCountry[index] = angular.copy(country);
        country.state        = 'edit';
    }

    function updateCountry (country) {
        country.state = 'idle';
        var countryToServer = new Country(country);
        countryToServer.$update();
    }

    function destroyCountry (index, country) {
        country.state = 'deleting';
        country.$delete().then(
            function(country) {
                vm.countries.splice(index, 1)
            }
        ).catch(
            function(country) {
                country.state = 'idle'
            }
        );
    }


    // Form Helpers
    function reset() {
        vm.newCountry = {};
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
    }

    init();
}
