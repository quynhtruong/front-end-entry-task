angular.module('eventSharingApp').factory('eventService', function (config, $http) {
    return {
        getAllEvent: function (params, successCallback, failureCallback) {
            return $http({
                url: config.baseURL + '/events/list?',
                method: 'GET',
                params:{
                    token: params.token,
                    page_index: params.page_index,
                    page_size: params.page_size,
                    channel_id: params.channel_id,
                    start_date: params.start_date,
                    end_date: params.end_date
                }
            }).success(function (data, status, headers, config) {
                successCallback(data);
            }).error(function (data, status, headers, config) {
                failureCallback(data);
            });
        },
        getAllChannel: function (token, successCallback, failureCallback) {
            return $http({
                url: config.baseURL + '/channels/list?',
                method: 'GET',
                params:{
                    token: token
                }
            }).success(function (data, status, headers, config) {
                successCallback(data);
            }).error(function (data, status, headers, config) {
                failureCallback(data);
            });
        },

    };
});
