var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
  $routeProvider.
    when('/list', {
      templateUrl: 'views/list.html',
      controller: 'listController'
    }).
    otherwise({
      redirectTo: '/list'
    });

    $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);