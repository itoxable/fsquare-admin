/**
 * Created by ruic on 01/04/2016.
 */


'use strict';
(function() {

    var app = angular.module('fsquareControlPanelApp.sites',['ngMaterial', 'fsquareControlPanelApp.services', 'factories']);

    app.controller('SitesController', ['$scope', '$rootScope', '$route', '$location', '$resource', 'lrayServices', 'utils',
        function ($scope, $rootScope, $route, $location, $resource, lrayServices, utils) {

            $scope.sites = [];

            lrayServices.callService('/api/jsonws/fsquare-shopping-portlet.sitecommonactions/get-accounts',{}, {
                callback: function(response){
                    $scope.sites = response.data;
                }
            });

            //lrayServices.
            //var PagesResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private',
            //    {groupId:'@groupId', private:'@private'});


        }
    ]);

})();