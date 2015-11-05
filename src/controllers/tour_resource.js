angular.module('tours').factory('Tour', function () {
    "use strict";
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
});
