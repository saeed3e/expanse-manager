 var app = angular.module('myApp', []);

 app.controller('overallStatus', function($scope) {
     $scope.remainingAmount = [{
         "name": "Anas",
         "deposite": 500,
         "invest": 200,
         "remaining": "90"
     }, {
         "name": "Rehan Mech",
         "deposite": 500,
         "invest": 200,
         "remaining": "190"
     }, {
         "name": "Rehan MCA",
         "deposite": 500,
         "invest": 200,
         "remaining": "290"
     }, {
         "name": "Saeed",
         "deposite": 500,
         "invest": 200,
         "remaining": "390"
     }, {
         "name": "Umair",
         "deposite": 500,
         "invest": 200,
         "remaining": "490"
     }]

 });
