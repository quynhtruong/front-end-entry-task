angular.module('eventSharingApp').controller('loginController', function ($scope, $state, loginService) {

    $scope.login = function () {
        sessionStorage.clear();
        loginService.get_salt($scope.email, function (dataSuccess) {
            $scope.salt = dataSuccess;
            console.log(password);
            var userDTO = {
                email:$scope.email,
                password: sha256(sha256(sha256($scope.password)+ $scope.salt))
            };
            loginService.login(userDTO, function (datasuccess) {
                sessionStorage.setItem("token", datasuccess.token);
                $state.go('list')
            }, function (dataFailure) {
                console.log(dataFailure)
            })

        }, function (dataError) {
            console.log(dataError)
        });

    };

});