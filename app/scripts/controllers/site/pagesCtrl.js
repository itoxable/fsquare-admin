/**
 * Created by ruic on 20/02/2016.
 */

'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.site-pages',['ui.tree', 'ngMaterial', 'fsquareControlPanelApp.filters', 'factories', 'fsquareControlPanelApp.services']);

  app.controller('SitePagesController', ['$scope', '$route', '$location','$mdDialog', 'orderByFilter', 'liferayLangToJsonFilter', 'utils', 'lrayServices',
    function ($scope, $route, $location, $mdDialog, orderByFilter, liferayLangToJsonFilter, utils, lrayServices) {

      //var PagesResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private',
      //  {
      //    groupId:'@groupId',
      //    private:'@private'
      //  },{
      //  get: {
      //    method:'GET',
      //    isArray:true
      //  }
      //});

      $scope.pages = [];
      $scope.treeData = [];

      $scope.transform = function(data){
        $scope.pages = data;
        data = orderByFilter(data, 'priority')
        var children = [];

        for(var i = 0; i < data.length; i++){
          data[i].children = [];
        }

        for(var i = 0; i < data.length; i++){
          var page = data[i];

          if(page.parentLayoutId > 0){
            var result = utils.searchInArray(data, 'layoutId', page.parentLayoutId);
            result.value.children.push(page);
          }

        }

        for(var i = 0; i < data.length; i++){
          var page = data[i];
          if(page.parentLayoutId == 0){
            $scope.treeData.push(page);
          }
        }
      }

      lrayServices.callService('/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private', {private:false}, {
        callback: function(response){
          $scope.transform(data);
        }
      });



      var PagePriorityResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/update-priority/plid/:plid/priority/:priority',
          {plid:'@plid', priority:'@priority'});

      //var PageDeleteResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/delete-layout/plid/:plid',
      //    {plid:'@plid'});


      $scope.treeOptions = {
        accept: function(sourceNodeScope, destNodesScope, destIndex) {
          /*PagesResource.get({
            plid:$rootScope.groupId,
            priority:false
          }).$promise.then(function(data) {
            return true;
          });*/
          return true;

        },
        dropped: function(event){
          var x;
        }

      };

      $scope.removePage = function(node){
        var confirm = $mdDialog.confirm({clickOutsideToClose:true})
            .title('Are you sure you want to delete this Page?')
            .textContent('This pages and all of its children will get deleted')
            .ariaLabel('delete this Page')
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function() {

          //PageDeleteResource.get({
          //  plid:node.$modelValue.plid
          //}).$promise.then(function(data){
          //  node.remove(node);
          //  $scope.showToast("Page Deleted");
          //});


          lrayServices.callService('/api/jsonws/layout/delete-layout/plid/:plid', {plid:node.$modelValue.plid}, {
            callback: function(response){
              node.remove(node);
              $scope.showToast("Page Deleted");
            }
          });



        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
      }

      $scope.editPage = function(page){
        $scope.selectedPage = page.$modelValue;
        $scope.selectedPage.name = liferayLangToJsonFilter($scope.selectedPage.name, "Name");
        $scope.selectedPage.description = liferayLangToJsonFilter($scope.selectedPage.description, "Description");
        $scope.selectedPage.title = liferayLangToJsonFilter($scope.selectedPage.title, "Title");
        $scope.selectedPage.keywords = liferayLangToJsonFilter($scope.selectedPage.keywords, "Keywords");
        $scope.selectedPage.robots = liferayLangToJsonFilter($scope.selectedPage.robots, "Robots");
        $scope.selectedPage.friendlyURL = liferayLangToJsonFilter($scope.selectedPage.friendlyURL, "FriendlyURL", $rootScope.DEFAULT_LOCALE);
      }


      $scope.savePage = function(){

        var url = '/api/jsonws/fsquare-shopping-portlet.sitecommonactions/update-layout/:groupId/:privateLayout/:layoutId/:parentLayoutId'+
            '/:localeNamesMap/:localeTitlesMap/:descriptionMap/:keywordsMap/:robotsMap/:type/:hidden'+
            '/:friendlyURLMap/:iconImage/:iconBytes/:serviceContext';

        var queryJson = {
          groupId: (!$scope.selectedPage.groupId || $scope.selectedPage.groupId == "")?"-group-id":"group-id/" + $scope.selectedPage.groupId,
          privateLayout: "private-layout/" + $scope.selectedPage.privateLayout,
          layoutId: "layout-id/" + $scope.selectedPage.layoutId,
          parentLayoutId: "parent-layout-id/" + $scope.selectedPage.parentLayoutId,
          localeNamesMap: (Object.keys($scope.selectedPage.name).length == 0)?"-locale-names-map":"locale-names-map/" + JSON.stringify($scope.selectedPage.name),
          localeTitlesMap: (Object.keys($scope.selectedPage.title).length == 0)?"-locale-titles-map":"locale-titles-map/" + JSON.stringify($scope.selectedPage.title),
          descriptionMap: (Object.keys($scope.selectedPage.description).length == 0)?"-description-map":"description-map/" + JSON.stringify($scope.selectedPage.description),
          keywordsMap: (Object.keys($scope.selectedPage.keywords).length == 0)?"-keywords-map":"keywords-map/" + JSON.stringify($scope.selectedPage.keywords),
          robotsMap: (Object.keys($scope.selectedPage.robots).length == 0)?"-robots-map":"robots-map/" + JSON.stringify($scope.selectedPage.robots),
          type: (!$scope.selectedPage.type || $scope.selectedPage.type == "")?"-type":"type/" + $scope.selectedPage.type,
          hidden: "hidden/" + $scope.selectedPage.hidden,
          friendlyURLMap: (Object.keys($scope.selectedPage.friendlyURL).length == 0)?"-friendly-url-map":"friendly-url-map/" + JSON.stringify($scope.selectedPage.friendlyURL),
          iconImage: (!$scope.selectedPage.iconImage || $scope.selectedPage.iconImage == "")?"-icon-image":"icon-image/" + ($scope.selectedPage.iconImage),
          iconBytes: (!$scope.selectedPage.iconBytes || $scope.selectedPage.iconBytes == "")?"-icon-bytes":"icon-bytes/" + $scope.selectedPage.iconBytes,
          serviceContext: utils.buildServiceContext({})
        }

        //for(var key in queryJson) {
        //  var replaceable = ":"+key;
        //  if(url.indexOf(key) > -1){
        //    url = url.replace(replaceable, queryJson[key]);
        //  }
        //}
        //console.log(url);



        lrayServices.callService(url, queryJson, {
          msg:"Page Updated",
          callback: function(response){
            node.remove(node);
            $scope.showToast("Page Deleted");
          }
        });

        //$http({
        //  method: 'GET',
        //  url: url
        //}).then(function successCallback(response) {
        //  $scope.showToast("Page Updated");
        //}, function errorCallback(response) {
        //});

      }


      $scope.selectedPage = {};


    }
  ]);

})();
