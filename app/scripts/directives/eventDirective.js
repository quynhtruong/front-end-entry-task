angular.module('eventSharingApp')
    .directive('eventItem', function() {
        return({
            restrict: 'AE',
            controller: 'eventItemController',
            scope : {
                event: '=',
            },
            templateUrl: 'views/templates/eventItem.html',
            link: function (scope, element, attributes, controller) {
            }
        });
    })
;

