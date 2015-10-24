angular.module('tours').controller('AdminToursController', AdminToursController);

AdminToursController.$inject = ['$resource', '$q'];

function AdminToursController(resource, q) {
    "use strict";
    var vm         = this;
    vm.newTour     = {};
    vm.tours       = [];
    vm.countries   = [];
    vm.places      = [];
    vm.showNewForm = false;

    vm.toggleNewForm = toggleNewForm;
    vm.createTour    = createTour;
    vm.editTour      = editTour;
    vm.updateTour    = updateTour;
    vm.destroyTour   = destroyTour;
    vm.cancelTour    = cancelTour;
    vm.cancelNewTour = cancelNewTour;
    vm.imagePath     = imagePath;
    vm.countryTitle  = countryTitle;
    vm.placeTitle    = placeTitle;

    var backupTour = [];

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Tour = resource('https://api.parse.com/1/classes/Tour/:objectId',
        {objectId: '@objectId'},
        {
            query: {isArray: true, transformResponse: parseResults},
            update: {isArray: false, method: 'PUT'}
        }
    );

    var Country = resource('https://api.parse.com/1/classes/Country/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
    );

    var Place = resource('https://api.parse.com/1/classes/Place/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
    );

    // CRUD
    function init () {
        reset();
        vm.countries = Country.query();
        vm.places = Place.query();

        q.all([vm.countries, vm.places]).then(
            function(data) {
                vm.tours = Tour.query();
            }
        );
    }

    function createTour (tour) {
        tour.slug    = tour.slug || 'default_slug';
        tour.state   = 'idle';
        var tourToServer = new Tour(tour);
        tourToServer.$save().then(
            function(tour) {
                var tourFromServer = angular.extend(tour, vm.newTour);
                vm.tours.push(tourFromServer);
                vm.newTour = {};
            }
        );
        toggleNewForm()
    }

    function editTour (index, tour) {
        backupTour[index] = angular.copy(tour);
        tour.state        = 'edit';
    }

    function updateTour (tour) {
        tour.state   = 'idle';
        var tourToServer = new Tour(tour);
        tourToServer.$update();
    }

    function destroyTour (index, tour) {
        tour.state = 'deleting';
        tour.$delete().then(
            function(tour) {
                vm.tours.splice(index, 1)
            }
        ).catch(
            function(tour) {
                tour.state = 'idle'
            }
        );
    }

    // Form Helpers
    function reset() {
        vm.newTour = {};
    }

    function cancelTour (index) {
        vm.tours[index]   = angular.copy(backupTour[index]);
        backupTour[index] = {};
    }

    function cancelNewTour () {
        toggleNewForm();
        reset();
    }

    function toggleNewForm() {
        vm.showNewForm = !vm.showNewForm;
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
        var country = vm.countries.filter(function(country) {
            return country.objectId == tour.country;
        });
        return country[0]? country[0].title : 'Unknown'
    }

    function placeTitle (tour) {
        var place = vm.places.filter(function(place) {
            return place.objectId == tour.place;
        });
        return place[0]? place[0].title : 'Unknown'
    }


    init();
}
