angular.module('eventSharingApp').controller('eventListController', function ($scope, $state, eventService) {


    var token = sessionStorage.getItem('token');
    $scope.now = $scope.now || new Date().getTime();    
    $scope._eventList = [];
    $scope._channel_list = [];
    $scope._channel_group_list = [];
    $scope.chooseDate = false;
    $scope._channel_id = undefined;
    $scope._start_date = undefined;
    $scope._end_date = undefined;
    $scope.isLoading = false;
    $scope.selectedDateTime = 'all';


    $scope.selectDate = function (dateTimeType) {
        $scope.selectedDateTime = dateTimeType;
        switch (dateTimeType) {
            case 'all':
                $scope._start_date = undefined;
                $scope._end_date = undefined;
                break;
            case 'day':
                $scope._start_date = Math.floor(moment().startOf('day').valueOf()/1000);
                $scope._end_date = Math.floor(moment().endOf('day').valueOf()/1000);
                break;
            case 'week':
                $scope._start_date = Math.floor(moment().startOf('isoweek').valueOf()/1000);
                $scope._end_date = Math.floor(moment().endOf('isoweek').valueOf()/1000);
                break;
            case 'month':
                $scope._start_date = Math.floor(moment().startOf('month').valueOf()/1000);
                $scope._end_date = Math.floor(moment().endOf('month').valueOf()/1000);
                break;
            case 'tomorrow':
                $scope._start_date = Math.floor(moment().endOf('day').valueOf()/1000);
                $scope._end_date = Math.floor(moment().endOf('day').add(1, 'day').valueOf()/1000);
                break;
        }
    };


    $scope.searchEvent = function () {
        reloadList();
    };

    $scope.chooseDateTime = function () {
        $scope.chooseDate = !$scope.chooseDate
    };

    $scope.loadMore = function () {
        console.log("load more!");
        if ($scope._hasMore) {
            var params = {
                token: token,
                page_index: $scope._pageIndex,
                page_size: $scope._pageSize,
                channel_id: $scope._channel_id,
                start_date: $scope._start_date,
                end_date: $scope._end_date
            };
            if ($scope._start_date instanceof Date) {
                params.start_date = Math.floor(moment($scope._start_date).valueOf()/1000);
                params.end_date = Math.floor(moment($scope._end_date).valueOf()/1000);
            }

            $scope.isLoading = true;
            eventService.getAllEvent(params, function (data) {
                $scope.isLoading = false;
                angular.forEach(data, function (dataItem) {
                    $scope._eventList.push(dataItem)
                });

                if (data.length < $scope._pageSize) {
                    $scope._hasMore = false
                }
                $scope._pageIndex++;
            }, function (data) {
                $scope.isLoading = false;
                console.log("error")
            })
        }
    };


    function reloadList() {
        $scope._eventList = [];
        $scope._hasMore = true;
        $scope._pageIndex = 0;
        $scope._pageSize = 20;
        $scope.loadMore();
    }

    $scope.filterByChannel = function (channelName) {
        $scope._channel_id = undefined;
        $scope._channel_list.forEach(function (channel) {
            if (channel.name == channelName) {
                $scope._channel_id = channel.id
            }
        });
    };

    $scope.loadChannel = function () {
        eventService.getAllChannel(token, function (dataSuccess) {
            $scope._channel_list = dataSuccess;
            $scope._channel_list.push({
                name: 'ALL'
            });

            for (var i = 0; i < $scope._channel_list.length; i++) {
                if (i % 3 == 0) {
                    var channel_group = {
                        first: $scope._channel_list[i]
                    };
                    $scope._channel_group_list.push(channel_group)
                }
                if (i % 3 == 1) {
                    var channel_group = $scope._channel_group_list[$scope._channel_group_list.length - 1];
                    channel_group.second = $scope._channel_list[i]
                }
                if (i % 3 == 2) {
                    var channel_group = $scope._channel_group_list[$scope._channel_group_list.length - 1];
                    channel_group.third = $scope._channel_list[i];
                }
            }
        }, function (dataError) {
            console.log(dataError)
        });

    };


    $scope.openCalendar = function (e, params) {
        e.preventDefault();
        e.stopPropagation();
        if (params == 'startDate') {
            $scope.openStartDate = true
        }
        else {
            $scope.openEndDate = true;
        }

    };

    $scope.loadChannel();

    reloadList()

});