angular.module('tours').controller('AdminToursController', AdminToursController);

AdminToursController.$inject = ['$resource', '$q', '$http'];

function AdminToursController(resource, q, http) {
    "use strict";
    var vm         = this;
    vm.newTour     = {};
    vm.tours       = [];
    vm.countries   = [];
    vm.places      = [];
    vm.hotels      = [];
    vm.showNewForm = false;

    vm.toggleNewForm   = toggleNewForm;
    vm.createTour      = createTour;
    vm.editTour        = editTour;
    vm.updateTour      = updateTour;
    vm.destroyTour     = destroyTour;
    vm.cancelTour      = cancelTour;
    vm.cancelNewTour   = cancelNewTour;
    vm.imagePath       = imagePath;
    vm.countryTitle    = countryTitle;
    vm.placeTitle      = placeTitle;
    vm.hotelTitle      = hotelTitle;
    vm.uploadFile      = uploadFile;

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

    var Hotel = resource('https://api.parse.com/1/classes/Hotel/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
    );

    // CRUD
    function init () {
        reset();
        vm.countries = Country.query();
        vm.places = Place.query();
        vm.hotels = Hotel.query();

        q.all([vm.countries, vm.places, vm.hotels]).then(
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

    function uploadFile (file) {
        var path = file.value;
        var fileName = path.match(/[^\/\\]+$/)[0];
        var tourId = file.dataset.tourId;
        var tour = Tour.get({objectId: tourId});
        http.post("https://api.parse.com/1/files/" + fileName, file[0], {
            withCredentials: false,
            headers: {
                "X-Parse-Application-Id": "XfANGmiC70rsMi7V4shf1fHfc6o4N8zsNVAOYvGL",
                "X-Parse-REST-API-Key": "zyDTgHIo63C6Kyp3wD6mflOoUPWJszDPSFtEbLBB",
                'Content-Type': 'image/jpeg'
            },
            transformRequest: angular.identity
        }).then(function(object) {
            tour.picture = {
                "name":     object.data.name,
                "__type":   "File"
            };
            console.log(tour);
            var tourToServer = new Tour(tour);
            console.log(tourToServer);
            tourToServer.$update();
        });
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

    function hotelTitle (tour) {
        var hotel = vm.hotels.filter(function(hotel) {
            return hotel.objectId == tour.hotel;
        });
        return hotel[0]? [hotel[0].title, hotel[0].stars] : 'Unknown'
    }

    init();
}
