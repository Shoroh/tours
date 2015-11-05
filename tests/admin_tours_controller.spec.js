describe('AdminToursController', function () {
    "use strict";

    beforeEach(module('tours'));
    var $scope = {};
    var vm;
    var countryAPIUrl = 'https://api.parse.com/1/classes/Country';
    var placeAPIUrl = 'https://api.parse.com/1/classes/Place';
    var hotelAPIUrl = 'https://api.parse.com/1/classes/Hotel';
    var tourAPIUrl = 'https://api.parse.com/1/classes/Tour';
    var $httpBackend = null;

    beforeEach(inject(function($controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        vm = $controller('AdminToursController', {$scope: $scope});
        $httpBackend.whenGET(countryAPIUrl).respond(200);
        $httpBackend.whenGET(placeAPIUrl).respond(200);
        $httpBackend.whenGET(hotelAPIUrl).respond(200);
        $httpBackend.whenGET(tourAPIUrl).respond(200);
    }));

    describe('initialize controller', function(){
        it('sets newTour to empty object', function () {
            expect(vm.newTour).toEqual({});
        });

        it('expect to call to parse.com', function () {
            $httpBackend.expectGET(countryAPIUrl);
            $httpBackend.expectGET(placeAPIUrl);
            $httpBackend.expectGET(hotelAPIUrl);
            $httpBackend.expectGET(tourAPIUrl);
            expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
        });
    });

});
