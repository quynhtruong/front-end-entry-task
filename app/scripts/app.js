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
  .module('eventSharingApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch', 
      'ui.bootstrap',
     'ui.bootstrap.datetimepicker',
     'angularSpinner',
     'infinite-scroll'
  ]);

angular.module('eventSharingApp').constant('config', {
    appName: 'Event app',
    appVersion: 0.1,
    baseURL: 'http://localhost:8000'
});
