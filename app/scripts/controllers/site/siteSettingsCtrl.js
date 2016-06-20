/**
 * Created by ruic on 20/02/2016.
 */

'use strict';
(function() {
    var app = angular.module('fsquareControlPanelApp.site-settings',['ngMaterial', 'fsquareControlPanelApp.services', 'factories']);

    app.controller('SiteSettingsController', ['$scope', '$rootScope', '$route', '$location', '$resource', 'lrayServices', 'utils',
        function ($scope, $rootScope, $route, $location, $resource, lrayServices, utils) {

            lrayServices.callService('/api/jsonws/group/get-group/group-id/:groupId',{}, {
                callback: function(response){
                    $scope.site = response.data;
                }
            });

            $scope.saveSettings = function(){

                var url = '/api/jsonws/fsquare-shopping-portlet.sitecommonactions/update-group/group-id/:groupId'+
                '/parent-group-id/:parentGroupId/name/:name/description/:description/type/:type/manual-membership/:manualMembership'
                +'/membership-restriction/:membershipRestriction/friendly-url/:friendlyUrl/active/:active';

                var queryJson = {
                    groupId: $scope.site.groupId,
                    parentGroupId: $scope.site.parentGroupId,
                    name: $scope.site.name,
                    description: $scope.site.description,
                    type: $scope.site.type,
                    manualMembership: $scope.site.manualMembership,
                    membershipRestriction: $scope.site.membershipRestriction,
                    friendlyUrl: $scope.site.friendlyURL.replace(/\//g, ""),
                    active: $scope.site.active,
                    serviceContext: utils.buildServiceContext({})
                }
                lrayServices.callService(url, queryJson, {
                    msg: "Site updated",
                    callback: function(response){
                        $scope.site = response.data;
                    }
                });


            }

        }
    ]);

})();