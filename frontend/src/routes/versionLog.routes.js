(function () {
'use strict';

// Declare app level module which depends on views, and components
angular.module('versionLog')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home',{
    url: '/',
    templateUrl: 'src/templates/versionLog.template.html',
    controller: 'proyectoController as proyectoC'
  })
   .state('bug',{
     url: '/bug',
     templateUrl: 'src/templates/bug.template.html',
     controller: 'bugController as bugC'
  });
}

})();
