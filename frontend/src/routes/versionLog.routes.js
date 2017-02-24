(function () {
'use strict';

// Declare app level module which depends on views, and components
angular.module('versionLog').
config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home',{
    url: '/'
  //  templateUrl: 'src/templates/envio.template.html',
  //  controller: 'proyectoController as proyectoC'

  });
  // .state('contacto',{
  //   url: '/contacto',
  //   templateUrl: 'src/templates/contacto.template.html',
    //controller: 'contactoController as contacto'
 // });
}

})();
