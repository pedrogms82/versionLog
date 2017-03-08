(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://192.168.50.12:3010/api/")
.service('nameService',nameService);

nameService.$inject = ['$http','apiUrl'];
function nameService($http,apiUrl){

  var Servicio = this;

  Servicio.getNombreProyectoById = function (proyectoId){

     return $http({
            method: "GET",
            url: (apiUrl+'proyecto-nombre/'+proyectoId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var nombreEncontrado = result.data;
          console.log(nombreEncontrado);
          return nombreEncontrado;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

  Servicio.getNombreVersionById = function (versionId){

     return $http({
            method: "GET",
            url: (apiUrl+'proyecto-nombre/'+versionId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var nombreEncontrado = result.data;
          console.log(nombreEncontrado);
          return nombreEncontrado;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

}
})();
