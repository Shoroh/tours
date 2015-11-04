angular.module('tours').controller('ToursController', ToursController);

ToursController.$inject = ['$resource', '$q'];

function ToursController(resource, q) {
    "use strict";
    var vm            = this;
    vm.tours          = [];
    vm.countries      = [];
    vm.places         = [];
    vm.hotels         = [];
    vm.sortReverse    = false;

    vm.changeReverse   = changeReverse;
    vm.imagePath       = imagePath;
    vm.countryTitle    = countryTitle;
    vm.placeTitle      = placeTitle;
    vm.setPlacesSelect = setPlacesSelect;
    vm.hotelTitle      = hotelTitle;

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Tour = resource('https://api.parse.com/1/classes/Tour/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
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

    function init() {
        vm.countries = Country.query();
        vm.places = Place.query();
        vm.hotels = Hotel.query();

        q.all([vm.countries, vm.places, vm.hotels]).then(
            function(data) {
                vm.tours = Tour.query();
            }
        );
    }

    function changeReverse () {
        vm.sortReverse = !vm.sortReverse
    }

    function setPlacesSelect (countryFilter) {
        if (countryFilter.country == "") {
            countryFilter.place = "";
        }
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
