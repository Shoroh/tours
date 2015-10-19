angular.module('tours').controller('TourController', TourController);

TourController.$inject = ['$routeParams'];

function TourController(params) {
    "use strict";
    var vm          = this;
    vm.tour         = {};
    vm.imagePath    = imagePath;
    vm.countryTitle = countryTitle;

    function init() {
        angular.forEach(allTours, function (tour) {
            if (params.slug == tour.slug) {
                vm.tour = tour;
            }
        });
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
