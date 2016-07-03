'use strict';

/**
 * @ngdoc overview
 * @name sockDogApp
 * @description
 * # sockDogApp
 *
 * Main module of the application.
 */
angular
  .module('sockDogApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  });
