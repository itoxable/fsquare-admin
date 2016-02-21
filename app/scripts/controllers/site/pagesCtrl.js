/**
 * Created by ruic on 20/02/2016.
 */

'use strict';
(function() {
  var app = angular.module('fsquareControlPanelApp.site-pages',['ui.tree', 'ngMaterial', 'fsquareControlPanelApp.filters', 'factories']);

  app.controller('SitePagesController', ['$scope', '$rootScope', '$route', '$location', '$resource', '$mdDialog', 'orderByFilter', 'liferayLangXmlFilter', 'utils',
    function ($scope, $rootScope, $route, $location, $resource, $mdDialog, orderByFilter, liferayLangXmlFilter, utils) {

      var PagesResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/get-layouts/group-id/:groupId/private-layout/:private',
        {
          groupId:'@groupId',
          private:'@private'
        },{
        get: {
          method:'GET',
          isArray:true
        }
      });

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


      PagesResource.get({
        groupId:$rootScope.groupId,
        private:false
      }).$promise.then(function(data) {
        return $scope.transform(data);
      });

      var PagePriorityResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/update-priority/plid/:plid/priority/:priority',
          {plid:'@plid', priority:'@priority'});

      var PageDeleteResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/delete-layout/plid/:plid',
          {plid:'@plid'});
      //"colorSchemeId": "",
      //    "companyId": 20154,
      //    "createDate": 1452686157000,
      //    "css": "",
      //    "description": "",
      //    "descriptionCurrentValue": "",
      //    "friendlyURL": "/panel",
      //    "groupId": 20181,
      //    "hidden": true,
      //    "iconImage": false,
      //    "iconImageId": 0,
      //    "keywords": "",
      //    "keywordsCurrentValue": "",
      //    "layoutId": 9,
      //    "layoutPrototypeLinkEnabled": false,
      //    "layoutPrototypeUuid": "",
      //    "modifiedDate": 1455989782000,
      //    "name": "<?xml version='1.0' encoding='UTF-8'?><root available-locales=\"en_GB\" default-locale=\"en_GB\"><Name language-id=\"en_GB\">Panel</Name></root>",
      //    "nameCurrentValue": "Panel",
      //    "parentLayoutId": 1,
      //    "plid": 27643,
      //    "priority": 2,
      //    "privateLayout": false,
      //    "robots": "",
      //    "robotsCurrentValue": "",
      //    "sourcePrototypeLayoutUuid": "",
      //    "themeId": "classic",
      //    "x": "",
      //    "titleCurrentValue": "",
      //    "type": "url",
      //    "typeSettings": "column-1-customizable=false\nlayout-template-id=1_column\nlayoutUpdateable=true\nsitemap-changefreq=daily\nsitemap-include=1\nurl=/web/admin/panel#\n",
      //    "userId": 20307,
      //    "userName": "Rui Cunha",
      //    "uuid": "de9ebbf4-6c90-47a5-a7db-f5531ee7c534",
      //    "wapColorSchemeId": "",
      //    "wapThemeId": "",
      //    "children": []
      var PageSaveResource = $resource($rootScope.BASE_URL+'/api/jsonws/layout/update-layout/group-id/:groupId/private-layout/:privateLayout/layout-id/:layoutId/parent-layout-id/:parentLayoutId'+
          '/locale-names-map/:localeNamesMap/locale-titles-map/:localeTitlesMap/description-map/:descriptionMap/keywords-map/:keywordsMap/robots-map/:robotsMap/type/:type/hidden/:hidden/'+
          'friendly-url/:friendlyUrl/icon-image/:iconImage/icon-bytes/iconBytes',
          {
            groupId:'@groupId',
            privateLayout:'@privateLayout',
            layoutId:'@layoutId',
            parentLayoutId:'@parentLayoutId',
            localeNamesMap:'@localeNamesMap',
            localeTitlesMap:'@localeTitlesMap',
            descriptionMap:'@descriptionMap',
            keywordsMap:'@keywordsMap',
            robotsMap:'@robotsMap',
            type:'@type',
            hidden:'@hidden',
            friendlyUrl:'@friendlyUrl',
            iconImage:'@iconImage',
            iconBytes:'@iconBytes'

          });


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
          //  plid:node.modelValue.plid
          //}).$promise.then(function(data) {node.remove(node);});

        }, function() {
          $scope.status = 'You decided to keep your debt.';
        });
      }

      $scope.editPage = function(page){
        $scope.selectedPage = page.$modelValue;
      }

      $scope.savePage = function(){

        $scope.PageSaveResource.save({
          groupId: $scope.selectedPage.groupId,
          privateLayout: $scope.selectedPage.privateLayout,
          layoutId: $scope.selectedPage.layoutId,
          parentLayoutId: $scope.selectedPage.parentLayoutId,
          localeNamesMap: $scope.selectedPage.localeNamesMap,
          localeTitlesMap: $scope.selectedPage.localeTitlesMap,
          descriptionMap: $scope.selectedPage.descriptionMap,
          keywordsMap: $scope.selectedPage.keywordsMap,
          robotsMap: $scope.selectedPage.robotsMap,
          type: $scope.selectedPage.type,
          hidden: $scope.selectedPage.hidden,
          friendlyUrl: $scope.selectedPage.friendlyUrl,
          iconImage: $scope.selectedPage.iconImage,
          iconBytes: $scope.selectedPage.iconBytes

        });
      }


      $scope.selectedPage = {};


    }
  ]);

})();
