'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.filters',[]);
  app.filter('numberToDate', function() {
   return function(input, format) {
     input = input || 0;
     if(input && input != null && input != ''){     
       return new Date(parseInt(input));
     }
     return null;
   };
 })
})();
