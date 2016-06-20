/**
 * Created by ruic on 28/03/2016.
 */


'use strict';
(function() {
    var app = angular.module('fsquareControlPanelApp.user-settings', ['ngMaterial', 'ngFileUpload', 'fsquareControlPanelApp.services', 'factories']);

    app.controller('UserPasswordController', ['$scope', 'lrayServices', 'Upload', '$timeout',
        function ($scope, lrayServices) {

            $scope.pass = {};
            $scope.user = {};
            lrayServices.callService('/api/jsonws/user/get-user-by-id/user-id/:userId', {}, {
                callback: function (response) {
                    $scope.user = response.data;
                    $scope.pass.userId = $scope.user.userId;
                }
            });

            $scope.changePassword = function(){
                lrayServices.callService('/api/jsonws/fsquare-shopping-portlet.sitecommonactions/update-password/user-id/:userId/old-password/:oldPassword/password1/:password1/password2/:password2', $scope.pass, {
                    callback: function (response) {

                        //$scope.user.contact = response.data;
                    },
                    msg:"Password updated"
                });
            }
        }
    ]);


    app.controller('UserSettingsController', ['$scope','lrayServices', 'Upload', '$timeout',
        function ($scope, lrayServices, Upload, $timeout) {
            $scope.user = lrayServices.currentUser;
            $scope.contactPrefixes = lrayServices.contactPrefixes;


            $scope.saveUser = function(){

                lrayServices.callService('/api/jsonws/user/update-user/user-id/:userId/screen-name/:screenName/email-address/:emailAddress/facebook-id/:facebookId/open-id/:openId/:prefix-id/:prefixId/comments/:comments/first-name/:firstName/last-name/:lastName', $scope.user, {
                    callback: function (response) {
                        $scope.user = response.data;
                        lrayServices.currentUser = $scope.user;
                    },
                    msg:"User Saved!"
                });
            };

//FILE UPLOAD STUFF

            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            $scope.$watch('file', function () {
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });
            $scope.log = '';

            $scope.upload = function (files) {
                if (files && files.length) {
                    //for (var i = 0; i < files.length; i++) {
                    //    var file = files[i];
                    //    if (!file.$error) {
                    //        Upload.upload({
                    //            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    //            data: {
                    //                username: $scope.username,
                    //                file: file
                    //            }
                    //        }).then(function (resp) {
                    //            $timeout(function() {
                    //                $scope.log = 'file: ' +
                    //                    resp.config.data.file.name +
                    //                    ', Response: ' + JSON.stringify(resp.data) +
                    //                    '\n' + $scope.log;
                    //            });
                    //        }, null, function (evt) {
                    //            var progressPercentage = parseInt(100.0 *
                    //                evt.loaded / evt.total);
                    //            $scope.log = 'progress: ' + progressPercentage +
                    //                '% ' + evt.config.data.file.name + '\n' +
                    //                $scope.log;
                    //        });
                    //    }
                    //}
                }
            };

        }])
})();
