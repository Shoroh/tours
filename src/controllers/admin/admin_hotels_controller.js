angular.module('tours').controller('AdminHotelsController', AdminHotelsController);

AdminHotelsController.$inject = ['$routeParams', '$resource', '$q'];

function AdminHotelsController(params, resource, q) {
    "use strict";
    var vm         = this;
    vm.newHotel  = {};
    vm.place  = {};
    vm.country  = {};
    vm.hotels   = [];
    vm.stars    = [1, 2, 3, 4, 5];
    vm.showNewForm = false;

    vm.toggleNewForm  = toggleNewForm;
    vm.createHotel    = createHotel;
    vm.editHotel      = editHotel;
    vm.updateHotel    = updateHotel;
    vm.destroyHotel   = destroyHotel;
    vm.cancelHotel    = cancelHotel;
    vm.cancelNewHotel = cancelNewHotel;

    var backupHotel = [];

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Place = resource('https://api.parse.com/1/classes/Place/:objectId',
        {objectId: '@objectId'}
    );

    var Country = resource('https://api.parse.com/1/classes/Country/:objectId',
        {objectId: '@objectId'}
    );

    var Hotel = resource('https://api.parse.com/1/classes/Hotel/:objectId',
        {objectId: '@objectId'},
        {
            query: {isArray: true, transformResponse: parseResults},
            update: {isArray: false, method: 'PUT'}
        }
    );

    // CRUD
    function init () {
        reset();
        vm.country = Country.get({objectId: params.country_id});
        vm.place = Place.get({objectId: params.place_id});
        q.all([vm.country, vm.place]).then(
            function(data) {
                vm.hotels = Hotel.query();
            }
        );
    }

    function createHotel (hotel) {
        hotel.state = 'idle';
        hotel.place = vm.place.objectId;
        var hotelToServer = new Hotel(hotel);
        hotelToServer.$save().then(
            function(hotel) {
                var hotelFromServer = angular.extend(hotel, vm.newHotel);
                vm.hotels.push(hotelFromServer);
                vm.newHotel = {};

            }
        );
        toggleNewForm()
    }

    function editHotel (index, hotel) {
        backupHotel[index] = angular.copy(hotel);
        hotel.state        = 'edit';
    }

    function updateHotel (hotel) {
        hotel.state = 'idle';
        var hotelToServer = new Hotel(hotel);
        hotelToServer.$update();
    }

    function destroyHotel (index, hotel) {
        hotel.state = 'deleting';
        hotel.$delete().then(
            function(hotel) {
                vm.hotels.splice(index, 1)
            }
        ).catch(
            function(hotel) {
                hotel.state = 'idle'
            }
        );
    }


    // Form Helpers
    function reset() {
        vm.newHotel = {};
    }

    function cancelHotel (index) {
        vm.hotels[index]  = angular.copy(backupHotel[index]);
        backupHotel[index] = {};
    }

    function cancelNewHotel () {
        toggleNewForm();
    }

    function toggleNewForm() {
        vm.showNewForm = !vm.showNewForm;
    }

    init();
}
