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


    function searchInArray(array, field, value, field2, value2){
      for(var i = 0; i < array.length; i++){
        var elem = array[i];

        if(field2 && value2){
          if(elem[field] == value && elem[field2] == value2){
            return {value: elem, index: i};
          }
        }else{
          var fieldTokens = field.split('.');
          var tokenVal = elem[field];
          if(!tokenVal){
            for(var j = 0; j < fieldTokens.length; j++){
              var token = fieldTokens[j];
              if((fieldTokens.length-1) == j){
                if(tokenVal[token] == value){
                  return {value: elem, index: i};
                }
              }else{
                tokenVal = elem[token];
              }
            }
          }else{
            if(tokenVal == value){
              return {value: elem, index: i};
            }
          }
        }
      }
      return undefined;
    }
    return {
      convertJsonToURL: convertJsonToURL,
      doGet: doGet,
      searchInArray:searchInArray
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
