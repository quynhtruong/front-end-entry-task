angular.module('eventSharingApp').factory('loginService', function (config, $http) {
    return {
        get_salt: function (email, successCallback, failureCallback) {
            return $http({
                url: config.baseURL + '/users/get_salt?email=' + email,
                method: 'GET'
            }).success(function (data, status, headers, config) {
                successCallback(data);
            }).error(function (data, status, headers, config) {
                failureCallback(data);
            });
        },

        login: function (userDTO, successCallback, failureCallback) {
            return $http({
                url: config.baseURL + '/users/login',
                method: 'POST',
                data: userDTO
            }).success(function (data, status, headers, config) {
                successCallback(data);
            }).error(function (data, status, headers, config) {
                failureCallback(data);
            });
        }
    };
});
