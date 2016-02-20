/**
 * Created by ruic on 15/01/2016.
 */

'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.shopping-shipping',[]);

  app.controller('ShoppingShippingController', ['$scope', '$rootScope', '$route', '$location', '$http',
    function ($scope, $rootScope, $route, $location, $http) {
      $rootScope.showContentHead = true;
    }
  ]);

})();
