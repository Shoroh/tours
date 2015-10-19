var app = angular.module('tours', ['ngRoute'])    .config(function ($routeProvider, $locationProvider) {        $routeProvider            .when('/', {                templateUrl: 'views/tours/index.html',                controller: 'ToursController',                controllerAs: 'vm'            })            .when('/tours/:slug', {                templateUrl: 'views/tours/show.html',                controller: 'TourController',                controllerAs: 'vm'            })            .when('/admin/tours', {                templateUrl: 'views/admin/tours/index.html',                controller:  'AdminToursController'            })            .when('/admin/countries', {                templateUrl: 'views/admin/countries/index.html',                controller:  'AdminCountriesController'            })            .otherwise({                redirectTo: '/'            });        $locationProvider.html5Mode(true);    });var COUNTRIES = [    {title: 'Russia',         id: 1},    {title: 'Germany',        id: 2},    {title: 'Austria',        id: 3},    {title: 'Hungary',        id: 4},    {title: 'Czech Republic', id: 5}];var TOURS = [    {        title:      'Moscow',        price:      5000,        body:       "Moscow is at a crossroads between the old and the new. Along with grand architecture and magnificent cultural treasures, the Russian capital also boasts exquisite restaurants and cutting-edge bars. Moscow is home to imposing, beautiful and fascinatingly bizarre buildings in a variety of styles. visiting the magnificent Kremlin with its opulent splendor of Fabergé eggs and Orlov Diamond. Take a glimpse into the Soviet era, with a tour of the stunning Metro system, Lenin’s tomb or the Cold War Bunker. Your guide will show you the greatest historical treasures of the Tretyakov and the modern masterpieces in the State Pushkin Museum prior to taking you backstage at the Bolshoi Theater.",        image:      'moscow.jpg',        country:    1,        slug:       'moscow'    },    {        title:      'St.Petersburg',        price:      4500,        body:       "If you have always dreamed of walking along the golden fountains of Peterhof Palace or a private boat tour during the white nights, when the sun does not set, we can make it a reality for you. Skip the lines at the Hermitage, get the best seat at the Mariinsky Theater, and dine at fabulous restaurants in walking distance of your hotel – we’ll take care of it all for you. A visit to St. Petersburg would not be complete without seeing Catherine Palace and the resurrected Amber Room. Take time to explore the Church of Spilled Blood, covered completely inside and out by mosaics and don’t leave Russia without experiencing the backstage tour at the world famous Mariinsky (Kirov) Theater.",        image:      'st-petersburg.jpg',        country:    1,        slug:       'petersburg'    },    {        title:      'Berlin',        price:      8000,        body:       "Berlin is one of Europe's most iconic and cosmopolitan cities. Visit Brandenburg Gate, then stroll down Unter den Linden through East Berlin and stop in to some of Berlin's outstanding Museums such as the incomparable Pergamon. Large swaths of the city destroyed in World War II have been rebuilt and restored since German Unification such as Pariser Platz, the imposing Berliner Dom and the Reichstag. There's also the moving reconstruction of the 'New' Synagogue featuring the Jewish Museum, and a controversial Holocaust Memorial. Berlin also has great nightlife from Opera and the Blue Man Group to techno nightclubs.",        image:      'berlin.jpg',        country:    2,        slug:       'berlin'    },    {        title:      'Vienna',        price:      10000,        body:       "Vienna has historically been a major hub of cultural, political, and economic importance. Dating back to the times of the Holy Roman Empire, this city has continuously played an important role in European civilization and is a spectacle to behold. With architectural landmarks spanning the city’s history, an abundance of museums and theaters, and pedestrian friendly streets lined with shops and cafes, there is something for everyone in Vienna.",        image:      'vienna.jpg',        country:    3,        slug:       'vienna'    },    {        title:      'Budapest',        price:      14000,        body:       'Budapest flourished as a crossroads where East meets West in the heart of Europe. Ancient cultures such as the Magyars, the Mongols and the Turks, have all left an indelible mark on this magical city. Buda and Pest, separated by the Danube River, are characterized by an assortment of monuments, elegant streets, wine taverns, coffee houses and Turkish baths.',        image:      'budapest.jpg',        country:    4,        slug:       'budapest'    },    {        title:      'Prague',        price:      35000,        body:       "Perhaps more than any other city in Europe, Prague has kept its pre-modern charm. Spared the destruction of the Second World War, the ancient structures of the city still exist in their original state. Prague is a walking city as it was designed over many centuries for the pedestrian and the horse. The inner city lacks major avenues as found in Paris or Rome, giving the city its unique character. Prague truly offers something for everyone, from wonderful art collections to stately medieval castles. Explore its deep Jewish history along with its beautiful architecture.",        image:      'prague.jpg',        country:    5,        slug:       'prague'    }];if (localStorage['tours']) {    var allTours = angular.fromJson(localStorage.getItem('tours'));} else {    var allTours = TOURS;}if (localStorage['countries']) {    var allCountries = angular.fromJson(localStorage.getItem('countries'));} else {    var allCountries = COUNTRIES;}