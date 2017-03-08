(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://192.168.50.12:3010/api/")
.service('versionService',versionService);

versionService.$inject = ['$http','apiUrl'];
function versionService($http,apiUrl){
  var Servicio = this;
  Servicio.getVersion = function (versionId){
     return $http({
            method: "GET",
            url: (apiUrl+'version/'+versionId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var versionEncontrados = result.data;
          console.log(versionEncontrados);
          return versionEncontrados;
    },
      function error(result){
        console.log("Error en la primera promesa");
        console.log(result);
    });
  }
  Servicio.getVersiones = function (proyectoId,pageCount){
     return $http({
            method: "POST",
            url: (apiUrl+'versiones/'+proyectoId+'/'+pageCount),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var versionesEncontrados = result.data;
          console.log(versionesEncontrados);
          return versionesEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
  Servicio.getVersionesActivas = function (proyectoId){
     return $http({
            method: "POST",
            url: (apiUrl+'versiones-activas/'+proyectoId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var versionesEncontrados = result.data;
          return versionesEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

  Servicio.deleteVersion = function (versionId){
     return $http({
            method: "DELETE",
            url: (apiUrl+'version/'+versionId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var versionesEliminadas = result.data;
          console.log("elimino");
          console.log(versionesEliminadas);
          return versionesEliminadas;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

  Servicio.actualizarVersion =  function (versionId, versionData){
    console.log(versionData);
    $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
    return $http({
           method: "PUT",
           url: (apiUrl+'version/'+versionId),
           //data : "message=" + versionData,
           data : Object.toparams(versionData),
           headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
   }).then(
     function success(result){
         // process result and only keep items that match
         var versionesActualizada = result.data;
         return versionesActualizada;
   },
     function error(){
       console.log("Error en la primera promesa");
   });
   Object.toparams = function ObjecttoParams(obj) {
       var p = [];
       for (var key in obj) {
           p.push(key + '=' + encodeURIComponent(obj[key]));
       }
       return p.join('&');
   };
 }
   Servicio.crearVersion =  function (versionData){
     console.log(versionData);
     $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
     return $http({
            method: "POST",
            url: (apiUrl+'version'),
            data : Object.toparams(versionData),
            headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var versionesNueva = result.data;
          return versionesNueva;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
  Object.toparams = function ObjecttoParams(obj) {
      var p = [];
      for (var key in obj) {
          p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
  };
}
})();
