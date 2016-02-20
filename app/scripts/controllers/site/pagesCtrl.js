/**
 * Created by ruic on 20/02/2016.
 */

'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.site-pages',[]);

  app.controller('SitePagesController', ['$scope', '$rootScope', '$route', '$location', '$http',
    function ($scope, $rootScope, $route, $location, $http) {

      http://localhost:8080/api/jsonws/layout/get-layouts/group-id/20181/private-layout/false


      var PagesResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private',
        {groupId:'@groupId', private:'@private'});


    }
  ]);

})();
