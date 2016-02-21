/**
 * Created by ruic on 20/02/2016.
 */


'use strict';
(function() {
    var app = angular.module('fsquareControlPanelApp.site-style',[]);

    app.controller('SiteStyleController', ['$scope', '$rootScope', '$route', '$location','$resource',
        function ($scope, $rootScope, $route, $location, $resource) {

            //var PagesResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private',
            //    {groupId:'@groupId', private:'@private'});


        }
    ]);

})();