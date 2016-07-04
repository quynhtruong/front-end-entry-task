/**
 * Created by quuynh on 03/07/16.
 */
angular.module('eventSharingApp').config(function($stateProvider,$urlRouterProvider) {

    /* Add New Routes Above */
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'main': {
                    templateUrl: 'views/login.html',
                    controller: 'loginController'
                }
            },
            viewLevel : 0,
            authenticate : false
        })
        .state('list', {
            url: '/list',
            views: {
                'main': {
                    templateUrl: 'views/list_events.html',
                    controller: 'eventListController'
                }
            },
            viewLevel : 0,
            authenticate : false
        });
    $urlRouterProvider.otherwise('/');
});

