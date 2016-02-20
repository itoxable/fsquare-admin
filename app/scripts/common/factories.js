/**
 * Created by ruic on 18/01/2016.
 */

'use strict';

(function() {
  var app = angular.module('factories', []);

  app.factory('utils', ['$http', function($http){
    function convertJsonToURL(obj){

      var keys = Object.keys(obj);
      var res = '';
      for(var i = 0; i< keys.length; i++){
        var key = keys[i];
        var val = obj[key];
        var str = '';
        for(var j = 0; j < key.length; j++){
          var character = key.charAt(j);
          if (character == character.toUpperCase()) {
            str += '-';
            str += character.toLowerCase();
          }else{
            str += character;
          }
        }
        res += '/'+str+'/'+val;
      }

      return res;
    }
    //post.setHeader("Authorization", "Basic " + encoding);
    function doGet(url, successCallback, errorCallback){
      $http({
        method: 'GET',
        url: url,
        headers:{"Authorization": "dGVzdEBsaWZlcmF5LmNvbTp0ZXN0"}
      }).then(function successCallback(response) {
        if(successCallback){
          successCallback(response);
        }
      }, function errorCallback(response) {
        if(errorCallback){
          errorCallback(response);
        }
      });
    }
    return {
      convertJsonToURL: convertJsonToURL,
      doGet: doGet
    };
  }]);


  app.factory('couponServices', ['$http', function($http){
    function saveCoupon(coupon){

    }
    function getCoupons(coupon){

    }
    return {
      saveCoupon: saveCoupon,
      getCoupons: getCoupons
    };
  }]);


})();
