var url = 'https://saeed3e.herokuapp.com';
//var url = 'http://localhost:5000'


var app = angular.module('myApp', []).constant('baseUrl', url);;


app.controller('signInsingUp', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
    $scope.flipSingIn = function(e) {
        $scope.isFlipped = false;
    }
    $scope.flipSingUp = function() {
        $scope.isFlipped = true;
        if ($scope.User) {
            var dataObj = JSON.stringify({
                name: $scope.User.Name1,
                password: $scope.User.Password1,
                email: $scope.User.Email,
                mobile: $scope.User.mobile
            });

            $http({
                url: "baseUrl+/signUp",
                method: "POST",
                data: dataObj,
            }).success(function(resp) {
                console.log(resp)
            }).error(function(err) {
                console.log(err)
            });
        }
    }
}]);


app.controller('myCtrl', ['$scope', '$http', 'baseUrl', function($scope, $http, baseUrl) {
    $scope.selectAll = false;
    $scope.selectAllStatus = false;

    $scope.changeState = function(node) {
        angular.element(node.target).parent().parent().children().eq(0).children().eq(0)[0].checked = false;
    };


    $scope.saveData = function() {
        console.log($scope.product)
        $http({
            method: 'POST', // GET, POST, PUT, HEAD etc
            url: baseUrl + "/saveData", // URL of resource being requested
            data: $scope.product
        }).success(function(resp) {
            console.log(arguments)
        }).error(function() {
            console.log(arguments)
        });
    }

    var getmembers = function(url) {
        $http.get(baseUrl + '/members').success(function(resp) {
            $scope.members = resp;
        }).error(function() {
            console.log(arguments)
        });
    }
    getmembers();


    // var getItemInfo = function(url) {
    //     $http.get(baseUrl + '/dailyInvest').success(function(resp) {
    //         console.log(resp);
    //         $scope.product = resp;
    //     }).error(function() {
    //         console.log(arguments)
    //     });
    // }
    // getItemInfo();

    $scope.addMember = function() {
        if ($scope.isEnabled && !$.isEmptyObject($scope.member)) {
            $scope.showLoader = true;
            $scope.isEnabled = false;
            $http({
                method: 'POST', // GET, POST, PUT, HEAD etc
                url: baseUrl + "/postMembers", // URL of resource being requested
                data: $scope.member
            }).success(function() {
                $scope.showLoader = false;
                $scope.isEnabled = true;
                $scope.member = '';
                console.log('member record saved successfully')
            }).error(function() {
                console.log(arguments)
            });
        } else {
            alert('please fill data')
        }

    };

    $scope.deleteMember = function(id) {
        $scope.showLoader = true;
        setTimeout(function() {
            $http({
                method: "delete",
                url: baseUrl + "/delete/",
                data: id
            }).success(function(res) {
                getmembers();
                $scope.showLoader = false;
            }).error(function() {
                console.log(arguments)
            });
        }, 500)
    }


}]); // end of controller
