(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://192.168.50.12:3010/api/")
.service('proyectoService',proyectoService);

proyectoService.$inject = ['$http','apiUrl'];
function proyectoService ($http, apiUrl){
  var Servicio = this;
  Servicio.getProyectos = function (){
     return $http({
            method: "GET",
            url: (apiUrl+'proyectos'),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var proyectosEncontrados = result.data;
          return proyectosEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
}// End MenuSearchService

})();
