/**
 * Created by ruic on 15/01/2016.
 */


'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.shopping-coupons',['ui.bootstrap','ngMaterial','factories','ngResource', 'fsquareControlPanelApp.filters']);

  app.controller('ShoppingCouponsController', ['$scope', '$rootScope', '$route', '$location','$mdDialog','NgTableParams','$resource','utils', 'numberToDateFilter',
    function ($scope, $rootScope, $route, $location, $mdDialog, NgTableParams, $resource, utils, numberToDateFilter) {


      $rootScope.showContentHead = true;
      $rootScope.pageName = 'Coupons'
      //$rootScope.showSubSidebar = true;
      $scope.data;
      $scope.selectedList = []

      $scope.activate = function (coupon){
        //console.log(coupon.active);
        $scope.savePromise(coupon).$promise.then(function(data) {
          console.log('saved');
        });
      }

      $scope.select = function (coupon, x){
        $scope.selectedList.push(coupon);
      }
      var DeleteItem = $resource($rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/delete-coupon/coupon-id/:couponId',
        {couponId:'@couponId'});

      $scope.deleteCoupon = function (coupon) {
        console.log('delete: '+coupon.couponId);
        DeleteItem.get({couponId:coupon.couponId}).$promise.then(function(data) {

        });
      }

      $scope.SaveItem = $resource($rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/:action/:object/shoppingCoupon.couponId/:couponId/shoppingCoupon.groupId/:groupId/shoppingCoupon.active/:active/shoppingCoupon.code/:code/shoppingCoupon.companyId/:companyId/shoppingCoupon.description/:description/shoppingCoupon.discount/:discount/shoppingCoupon.discountType/:discountType/shoppingCoupon.endDate/:endDate/shoppingCoupon.startDate/:startDate/shoppingCoupon.name/:name/shoppingCoupon.userId/:userId/shoppingCoupon.minOrder/:minOrder/shoppingCoupon.maxUses/:maxUses/',
        {
          action:'@action',
          object:'@object',
          groupId:'@groupId',
          couponId:'@couponId',
          active:'@active',
          code:'@code',
          companyId:'@companyId',
          description:'@description',
          discount:'@discount',
          discountType:'@discountType',
          endDate:'@endDate',
          startDate:'@startDate',
          name:'@name',
          userId:'@userId',
          minOrder:'@minOrder',
          maxUses:'@maxUses'
        }
      );

      $scope.openForm = function (event, coupon) {
        $scope.coupon = {};
        $scope.startDateValue;
        $scope.endDateValue;
        if(coupon){
          $scope.coupon = coupon;

        }else{
          $scope.coupon.new = true;
          /*$scope.startDateValue = new Date(year, month, day);
          $scope.endDateValue = new Date(year, month, day);*/
        }


  	    $mdDialog.show({
  	    	controller: ShoppingCouponFormController,
  	      	templateUrl: 'views/pages/shopping/coupons-form.html',
  	      	parent: angular.element(document.body),
  	      	targetEvent: event,
  	      	clickOutsideToClose:true,
            scope: $scope.$new()
  	    });

      };


      $scope.savePromise = function(coupon) {
        /*$scope.coupon.endDate = endDateValue.getTime();
        $scope.coupon.startDate = startDateValue.getTime();*/
        return $scope.SaveItem.save({
          action:'update-shopping-coupon',
          object:'+shopping-coupon:com.fsquare.shopping.model.impl.ShoppingCouponImpl',
          groupId:coupon.groupId,
          couponId:coupon.couponId,
          active:coupon.active,
          code:coupon.code,
          companyId:coupon.companyId,
          description:coupon.description,
          discount:coupon.discount,
          discountType:coupon.discountType,
          endDate:coupon.endDate,
          startDate:coupon.startDate,
          name:coupon.name,
          userId:coupon.userId,
          minOrder:coupon.minOrder,
          maxUses:coupon.maxUses

        });

      }

      function ShoppingCouponFormController($scope, $mdDialog) {
        //$scope.coupon;

        $scope.startDateValue = numberToDateFilter($scope.coupon.startDate);//new Date($scope.coupon.startDate);
        $scope.endDateValue = numberToDateFilter($scope.coupon.endDate);
        $scope.coupon.endDate = $scope.endDateValue.getTime();
        $scope.coupon.startDate = $scope.startDateValue.getTime();


        $scope.save = function() {
          $scope.savePromise($scope.coupon).$promise.then(function(data) {
            $mdDialog.hide();
          });
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
      }

      var Items = $resource($rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/get-paged-items/group-id/:groupId/start/:start/end/:end',
        {groupId:'@groupId', start:'@start', end:'@end'});

      $scope.tableParams = new NgTableParams(
          {
            page: 1, // show first page
            count: 10 // count per page
          },

          {
          getData: function(params) {
            //console.log(params.url());
            return Items.get({groupId:$rootScope.groupId, start:(params.page()-1), end:(params.page()+params.count()-1)}).$promise.then(function(data) {
              $scope.tableParams.total(data.total);
              return data.items;
            });


          }
        }
      );
      $scope.tableParams.settings().counts = [];

    }
  ]);

  app.controller('ShoppingCouponFormController', ['$scope', '$rootScope', '$route', '$location','$http','$uibModalInstance','coupon','utils',
    function ($scope, $rootScope, $route, $location, $http, $uibModalInstance, coupon, utils){

      $scope.coupon = coupon;
      $scope.startDate = {
        opened: false
      };
      $scope.endDate = {
        opened: false
      };

      $scope.startDateValue = new Date($scope.coupon.startDate);
      $scope.endDateValue = new Date($scope.coupon.endDate);

      //$scope.disabled = function(date, mode) {
      //  return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      //};
      //
      //$scope.toggleMin = function() {
      //  $scope.minDate = $scope.minDate ? null : new Date();
      //};
      //
      //$scope.toggleMin();
      //$scope.maxDate = new Date(2020, 5, 22);
      $scope.select2Options = {};
      $scope.couponCategories;
      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        showButtonBar: false
      };

      $scope.openStartDate = function() {
        $scope.startDate.opened = true;
      };
      $scope.openEndDate = function() {
        $scope.endDate.opened = true;
      };

      $scope.setStartDate = function(year, month, day) {
        $scope.startDateValue = new Date(year, month, day);
      };
      $scope.setEndDate = function(year, month, day) {
        $scope.endDateValue = new Date(year, month, day);
      };


      $scope.save = function () {
        //var xx ={};
        var obj = utils.convertJsonToURL($scope.coupon);

        $http({
          method: "GET",
          url: $rootScope.BASE_URL+'/api/jsonws/fsquare-shopping-portlet.shoppingcoupon/update-shopping-coupon'+obj
        }).success(function(result) {
          console.log(result);
          $uibModalInstance.close($scope.coupon);
        }).error(function(data, status, headers, config) {
          console.log("error!");
        });



        //$uibModalInstance.close($scope.coupon);//$uibModalInstance
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };


    }]);


})();
