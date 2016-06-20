/**
 * Created by ruic on 28/03/2016.
 */


//var myModule = angular.module('myModule', []);
//myModule.factory('lrayService', function() {
//    var shinyNewServiceInstance;
//    // factory function body that constructs shinyNewServiceInstance
//    return shinyNewServiceInstance;
//});

'use strict';
(function() {
    var app = angular.module('fsquareControlPanelApp.services',['ngResource', 'ngMaterial']);



    app.service('CONSTS', function() {

        var self = this;


        this.IMAGE_BASE_URL = '/image/item?img_id';
        this.DEFAULT_LOCALE = 'en_GB';





    });

    app.service('lrayServices', ['$http', '$mdToast', 'CONSTS', function($http, $mdToast, CONSTS) {

        var self = this;
        this.groupId = 20181;
        this.BASE_URL = 'liferay';
        this.userId = 20307;
        this.contactPrefixes = [];
        this.currentUser = {};

        this.getContactPrefixes = function(callback){

            self.callService('/api/jsonws/listtype/get-list-types/type/com.liferay.portal.model.Contact.prefix', {}, {
                callback: function(response) {
                    self.contactPrefixes = response.data;
                    if(callback){
                        callback(response);
                    }
                }
            });
        }


        this.callService = function(url, data, success, error){

            if(!data){
                data = {};
            }
            data.groupId = self.groupId;
            data.userId = self.userId;

                for(var key in data) {
                var replaceable = ":"+key;
                if(url.indexOf(key) > -1){
                    url = url.replace(replaceable, data[key]);
                }
            }

            $http({
                method: 'GET',
                url: self.BASE_URL+url
            }).then(function successCallback(response) {
                console.log("SUCCESS CALLING: ["+url+"]["+response+"]");
                if(success){
                    if(success.msg){
                        self.showToast(success.msg);
                    }

                    if(success.callback){
                        success.callback(response);
                    }
                }


            }, function errorCallback(response) {

                console.log("ERROR CALLING: ["+url+"]["+JSON.stringify(response)+"]");
                if(error){
                    if(error.msg){
                        self.showToast(error.msg);
                    }

                    if(error.callback){
                        error.callback(response);
                    }
                }
            });
        }


        this.showToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position("top right" )
                    .hideDelay(3000)
            );
        };

    }]);





    //
    //app.controller('ShoppingCouponsController', ['$scope', 'this', '$route', '$location','$mdDialog','NgTableParams','$resource','utils', 'numberToDateFilter',
    //    function ($scope, this, $route, $location, $mdDialog, NgTableParams, $resource, utils, numberToDateFilter) {}
    //
    //




})();