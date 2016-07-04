angular.module('eventSharingApp').directive('ccSpinner', function () {
    return {
        'restrict': 'AE',
        'templateUrl': 'views/templates/spinner.html',
        'scope': {
            'isLoading': '=',
            'message': '@'
        }
    }
});