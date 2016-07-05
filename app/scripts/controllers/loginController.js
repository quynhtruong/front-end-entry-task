angular.module('eventSharingApp').controller('loginController', function ($scope, $state, loginService) {


    $scope.login = function () {
        sessionStorage.clear();
        //validation
        $scope.emailRequired = false;
        $scope.emailValid = false;
        $scope.passwordRequired = false;
        $scope.serviceError = false;

        if ($scope.loginForm.email.$error.required) {
            $scope.emailRequired = true;
            return
        }

        if ($scope.loginForm.email.$error.email) {
            $scope.emailValid = true;
            return
        }

        if ($scope.loginForm.password.$error.required) {
            $scope.passwordRequired = true;
            return
        }

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
                $scope.serviceError = true;
                $scope.message = "Username or password incorrect!";
            })

        }, function (dataError) {
            $scope.serviceError = true;
            $scope.message = "Could not connect to server!"
        });

    };

});