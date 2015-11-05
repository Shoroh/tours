angular.module('tours').controller('TourController', TourController);

TourController.$inject = ['$routeParams', '$resource', '$q'];

function TourController(params, resource, q) {
    "use strict";
    var vm          = this;
    vm.tour         = {};
    vm.imagePath    = imagePath;
    vm.countryTitle = countryTitle;
    vm.placeTitle   = placeTitle;

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Tour = resource('https://api.parse.com/1/classes/Tour/:objectId',
        {objectId: '@objectId'}
    );

    var Country = resource('https://api.parse.com/1/classes/Country/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
    );

    var Place = resource('https://api.parse.com/1/classes/Place/:objectId',
        {objectId: '@objectId'},
        {query: {isArray: true, transformResponse: parseResults}}
    );

    function init() {
        vm.countries = Country.query();
        vm.places = Place.query();
        q.all([vm.countries, vm.places]).then(
            function(data) {
                vm.tour = Tour.get({objectId: params.id});
            }
        );
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
