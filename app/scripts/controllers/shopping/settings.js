/**
 * Created by ruic on 15/01/2016.
 */


'use strict';
(function() {

  var app = angular.module('fsquareControlPanelApp.shopping-settings',[]);

  app.controller('ShoppingSettingsController', ['$scope', '$rootScope', '$route', '$location', '$http',
    function ($scope, $rootScope, $route, $location, $http) {
      $rootScope.showContentHead = true;
      $scope.save = function(){
        $http.post($rootScope.BASE_URL+"/fsquare-shopping-portlet/services/store/save", JSON.stringify($scope.storeSettings)).success(function(data, status) {
          var xx;
        })

      };

      $scope.storeSettings = {};
      /*
        "braintreeMerchantId": "",
          "braintreePrivateKey": "",
          "braintreePublicKey": "",
          "braintreeSandboxMerchantId": "wzp5vt9qbrzyd5hd",
          "braintreeSandboxPrivateKey": "8631cfe19d574db06bc619e6ab98389d",
          "braintreeSandboxPublicKey": "qyz63wmh393n4vpj",
          "cartPageUuid": "abbd42d7-335f-465e-a604-b1979f619e10",
          "checkoutCompletePageTemplate": "",
          "checkoutPageFullscreen": true,
          "checkoutPageUuid": "560b3fc4-e004-4137-8c6c-e42e6005ce4b",
          "companyId": 20154,
          "country": "GB",
          "createDate": 1450192141000,
          "currency": "GBP",
          "defaultEmailAddress": "ruicunh@gmail.com",
          "groupId": 20181,
          "integrateWithBraintree": true,
          "integrateWithStripe": false,
          "modifiedDate": 1450697218000,
          "name": "Jo walton",
          "onAddToCart": "jumpToCart",
          "orderCreatedEmailFromAddress": "",
          "orderCreatedEmailSubject": "",
          "orderCreatedEmailTemplate": "",
          "orderShippedEmailTemplate": "",
          "productsMainPageUuid": "c3a2ce79-9fa4-4434-ab9a-ca3f58ee72d1",
          "stripeApiVersion": "",
          "stripeLivePublishableKey": "",
          "stripeLiveSecretKey": "",
          "stripeTestPublishableKey": "",
          "stripeTestSecretKey": "",
          "stripeTesting": false,
          "useBraintreeSandbox": true,
          "userId": 20307,
          "userName": "ruicunh@gmail.com",
          "userTypes": "all"
      }*/
      $http({
        method: "GET",
        url: $rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingstore/get-shopping-store/group-id/20181'
      }).success(function(result) {
        $scope.storeSettings = result;
      }).error(function(data, status, headers, config) {
        console.log("error!");
      });
    }
  ]);

})();
