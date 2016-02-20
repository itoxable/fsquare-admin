/**
 * Created by ruic on 15/01/2016.
 */


'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.shopping-inventory',[]);

  app.controller('ShoppingInventoryController', ['$scope', '$rootScope', '$route', '$location', '$http',
    function ($scope, $rootScope, $route, $location, $http) {
      $rootScope.showContentHead = true;

      $scope.deleteItem = function (item) {
        console.log('delete: '+JSON.stringify(item));
      }

      $scope.openForm = function (item) {
        console.log('open: '+JSON.stringify(item));
      }



      $scope.total = 0;
      $http({
        method: "GET",
        headers: headers,
        url: $rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/count-by-group-id/group-id/20181'
      }).success(function(result) {
        $scope.total = result;

        $http({
          method: "GET",
          headers: headers,
          url: $rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/find-by-group-id/group-id/20181'
        }).success(function(result) {
          $scope.data = result;


          $scope.tableParams = new NgTableParams({
              page: 1, // show first page
              count: 1 // count per page
            }, {
              total: $scope.total, // length of data
              getData: function(params) {
                return $scope.data;

              }
            }
          );

        }).error(function(data, status, headers, config) {
          console.log("error!");
        });


      }).error(function(data, status, headers, config) {
        console.log("error!");
      });
    }
  ]);

})();
