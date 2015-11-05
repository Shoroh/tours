angular.module('tours').controller('AdminPlacesController', AdminPlacesController);

AdminPlacesController.$inject = ['$routeParams', '$resource', '$q'];

function AdminPlacesController(params, resource, q) {
    "use strict";
    var vm         = this;
    vm.newPlace  = {};
    vm.country  = {};
    vm.places   = [];
    vm.showNewForm = false;

    vm.toggleNewForm  = toggleNewForm;
    vm.createPlace    = createPlace;
    vm.editPlace      = editPlace;
    vm.updatePlace    = updatePlace;
    vm.destroyPlace   = destroyPlace;
    vm.cancelPlace    = cancelPlace;
    vm.cancelNewPlace = cancelNewPlace;

    var backupPlace = [];

    function parseResults(data, headerGetter) {
        data = angular.fromJson(data);
        return data.results;
    }

    var Country = resource('https://api.parse.com/1/classes/Country/:objectId',
        {objectId: '@objectId'}
    );

    var Place = resource('https://api.parse.com/1/classes/Place/:objectId',
        {objectId: '@objectId'},
        {
            query: {isArray: true, transformResponse: parseResults},
            update: {isArray: false, method: 'PUT'}
        }
    );

    // CRUD
    function init () {
        reset();
        vm.country = Country.get({objectId: params.id});
        q.all(vm.country).then(
            function(data) {
                vm.places = Place.query();
            }
        );
    }

    function createPlace (place) {
        place.state = 'idle';
        place.country = vm.country.objectId;
        var placeToServer = new Place(place);
        placeToServer.$save().then(
            function(place) {
                var placeFromServer = angular.extend(place, vm.newPlace);
                vm.places.push(placeFromServer);
                vm.newPlace = {};

            }
        );
        toggleNewForm()
    }

    function editPlace (index, place) {
        backupPlace[index] = angular.copy(place);
        place.state        = 'edit';
    }

    function updatePlace (place) {
        place.state = 'idle';
        var placeToServer = new Place(place);
        placeToServer.$update();
    }

    function destroyPlace (index, place) {
        place.state = 'deleting';
        place.$delete().then(
            function(place) {
                vm.places.splice(index, 1)
            }
        ).catch(
            function(place) {
                place.state = 'idle'
            }
        );
    }


    // Form Helpers
    function reset() {
        vm.newPlace = {};
    }

    function cancelPlace (index) {
        vm.places[index]  = angular.copy(backupPlace[index]);
        backupPlace[index] = {};
    }

    function cancelNewPlace () {
        toggleNewForm();
    }

    function toggleNewForm() {
        vm.showNewForm = !vm.showNewForm;
    }

    init();
}
