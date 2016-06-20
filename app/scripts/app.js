'use strict';

/**
* @ngdoc overview
* @name MaterialApp
* @description
* # MaterialApp
*
* Main module of the application.
*/
window.app_version = 2.0;
(function() {
  var app =  angular.module('MaterialApp', [
    'ngRoute',
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'ngTable',
    'chart.js',
    'gridshore.c3js.chart',
    'angular-growl',
    'growlNotifications',
    'angular-loading-bar',
    'easypiechart',
    'ui.sortable',
    angularDragula(angular),
    'bootstrapLightbox',
    'materialCalendar',
    'paperCollapse',
    'pascalprecht.translate',
    'fsquareControlPanelApp.site-settings',
    'fsquareControlPanelApp.site-pages',
    'fsquareControlPanelApp.site-style',
    'fsquareControlPanelApp.shopping-coupons',
    'fsquareControlPanelApp.shopping-settings',
    'fsquareControlPanelApp.shopping-inventory',
      'fsquareControlPanelApp.sites',
      'fsquareControlPanelApp.services',
      'fsquareControlPanelApp.user-settings'
  ]);

  app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
      cfpLoadingBarProvider.latencyThreshold = 5;
        cfpLoadingBarProvider.includeSpinner = false;
  }]);

  app.config(function($translateProvider) {
      $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage('en');
  });

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/home');
    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
    .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html?v='+window.app_version,
        controller: 'DashboardCtrl'
    })
    .state('login', {
        url: '/login',
        parent: 'base',
        templateUrl: 'views/pages/login.html?v='+window.app_version,
        controller: 'LoginCtrl'
    })
    .state('signup', {
        url: '/signup',
        parent: 'base',
        templateUrl: 'views/pages/signup.html?v='+window.app_version,
        controller: 'LoginCtrl'
    })
    .state('404', {
        url: '/404-page',
        parent: 'base',
        templateUrl: 'views/pages/404-page.html?v='+window.app_version
    })
    .state('dashboard', {
        url: '/dashboard',
        parent: 'base',
        templateUrl: 'views/layouts/dashboard.html?v='+window.app_version,
        controller: 'DashboardCtrl'
    })
    .state('home', {
        url: '/home',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/home.html?v='+window.app_version,
        controller: 'HomeCtrl'
    })
    .state('blank', {
        url: '/blank',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/blank.html?v='+window.app_version
    })
    .state('profile', {
        url: '/profile',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/profile.html?v='+window.app_version,
        controller: 'profileCtrl'
    })
    .state('form', {
        url: '/form',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/form.html?v='+window.app_version,
        controller: 'formCtrl'
    })

    .state('button', {
        url: '/ui-elements/button',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/ui-elements/button.html?v='+window.app_version
    })
    .state('card', {
        url: '/ui-elements/card',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/ui-elements/card.html?v='+window.app_version,
        controller: 'cardCtrl'
    })
    .state('components', {
        url: '/ui-elements/components',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/component.html?v='+window.app_version,
        controller: 'componentCtrl'
    })
    .state('chartjs', {
        url: '/charts/chart.js',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/charts/chartjs.html?v='+window.app_version,
        controller: 'ChartCtrl'
    })
    .state('c3chart', {
        url: '/charts/c3chart',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/charts/c3chart.html?v='+window.app_version
    })
    .state('calendar', {
        url: '/calendar',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/calendar.html?v='+window.app_version,
        controller: 'calendarCtrl'
    })
    .state('invoice', {
        url: '/invoice',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/invoice.html?v='+window.app_version
    })
    .state('inbox', {
        url: '/mail/inbox',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/mail/inbox.html?v='+window.app_version,
        controller: 'paperCtrl'
    })
    .state('docs', {
        url: '/docs',
        parent: 'dashboard',
        templateUrl: 'views/pages/dashboard/docs.html?v='+window.app_version,
        controller: 'docsCtrl'
    })
/*---- Fsquare ----*/

    .state('user-details', {
        url: '/user/details',
        parent: 'dashboard',
        templateUrl: 'views/pages/user/details.html?v='+window.app_version,
        controller: 'UserSettingsController'
    })
    .state('password-change', {
        url: '/details',
        parent: 'dashboard',
        templateUrl: 'views/pages/user/change-password.html?v='+window.app_version,
        controller: 'UserPasswordController'
    })
    .state('site-settings', {
        url: '/site/settings',
        parent: 'dashboard',
        templateUrl: 'views/pages/site/settings.html?v='+window.app_version,
        controller: 'SiteSettingsController'
    })
        .state('sites', {
            url: '/sites',
            parent: 'dashboard',
            templateUrl: 'views/pages/site/sites.html?v='+window.app_version,
            controller: 'SitesController'
        })
    .state('pages', {
        url: '/site/pages',
        parent: 'dashboard',
        templateUrl: 'views/pages/site/pages.html?v='+window.app_version,
        controller: 'SitePagesController'
    })
    .state('style', {
        url: '/style',
        parent: 'dashboard',
        templateUrl: 'views/pages/site/style.html?v='+window.app_version,
        controller: 'SiteStyleController'
    })


    .state('shopping', {
        url: '/shopping',
        parent: 'dashboard',
        templateUrl: 'views/pages/shopping/shopping.html?v='+window.app_version,
        controller: 'DashboardCtrl'
    })
    .state('shopping-settings', {
        url: '/shopping',
        parent: 'dashboard',
        templateUrl: 'views/pages/shopping/settings.html?v='+window.app_version,
        controller: 'ShoppingSettingsController'
    })


    .state('coupons', {
        url: '/coupons',
        parent: 'shopping',
        templateUrl: 'views/pages/shopping/coupons.html?v='+window.app_version,
        controller: 'ShoppingCouponsController'
    })
    .state('inventory', {
        url: '/inventory',
        parent: 'shopping',
        templateUrl: 'views/pages/shopping/inventory.html?v='+window.app_version,
        controller: 'inventoryCtrl'
    })
    .state('orders', {
        url: '/orders',
        parent: 'shopping',
        templateUrl: 'views/pages/shopping/orders.html?v='+window.app_version,
        controller: 'ordersCtrl'
    })
    .state('shipping', {
        url: '/shipping',
        parent: 'shipping',
        templateUrl: 'views/pages/shopping/shipping.html?v='+window.app_version,
        controller: 'shippingCtrl'
    });
  });

  app.run(['$rootScope', '$http', 'utils', 'lrayServices', function($rootScope, $http, utils, lrayServices) {


      //http://localhost:8080/image/user_male_portrait?img_id=38204&img_id_token=Owf10o%2BZjRaaqlsTgsT%2Ff9IiBtc%3D
//http://localhost:8080/image/user?img_id=38204&img_id_token=Owf10o%2BZjRaaqlsTgsT%2Ff9IiBtc%3D
     $rootScope.settings = {};
     $rootScope.settings.countries = [];
     $rootScope.settings.layouts = [];
     $rootScope.settings.currencies = ['GBP','USD','EUR'];
     // $rootScope.contactPrefixes = [];

      lrayServices.getContactPrefixes(function(response){
          //$rootScope.contactPrefixes = response.data;

      });


      lrayServices.callService('/api/jsonws/user/get-user-by-id/user-id/:userId', {}, {
          callback: function (response) {
              lrayServices.currentUser = response.data;


              //if (lrayServices.currentUser.portraitId > 0){
                  lrayServices.callService('api/jsonws/fsquare-shopping-portlet.sitecommonactions/get-user-portrait-url/male/true/portrait-id/:portraitId', lrayServices.currentUser, {
                      callback: function (res) {
                          lrayServices.currentUser.portraitUrl = "/"+lrayServices.BASE_URL+res.data;
                      }
                  });
                //}


              lrayServices.callService('/api/jsonws/contact/get-contact/contact-id/:contactId', lrayServices.currentUser , {
                  callback: function (res) {
                      lrayServices.currentUser.contact = res.data;
                      $rootScope.currentUser = lrayServices.currentUser;


                  }
              });


          }
      });


      lrayServices.callService('/api/jsonws/fsquare-shopping-portlet.shoppingstore/get-settings', {}, {
          callback: function(response){
              $rootScope.settings = response.data;
          }
      });

      lrayServices.callService('/api/jsonws/country/get-countries/active/true', {}, {
          callback: function(response){
              $rootScope.settings.countries = response.data;
          }
      });

      lrayServices.callService('/fsquare-shopping-portlet/services/shoppinglayouts/groupId/:groupId', {}, {
          callback: function(response){
              $rootScope.settings.layouts = response.data.data;
          }
      });


   }]);


})();
