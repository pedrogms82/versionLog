(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://192.168.50.12:3010/api/")
.service('modLogService',modLogService);

modLogService.$inject = ['$http','apiUrl'];
function modLogService($http,apiUrl){
  var Servicio = this;
  Servicio.getModLog = function (modLogId){
     return $http({
            method: "GET",
            url: (apiUrl+'modlog/'+modLogId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var modLogEncontrados = result.data;
          return modLogEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
  Servicio.getModLogs = function (versionId, pageCount){
     return $http({
            method: "POST",
            url: (apiUrl+'modlogs/'+versionId+'/'+pageCount),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var modLogEncontrados = result.data;
          return modLogEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
  Servicio.crearModLog =  function (modLogData){
    console.log("datos del ModLog");
    console.log(modLogData);
    $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
    return $http({
           method: "POST",
           url: (apiUrl+'modlog'),
           data : Object.toparams(modLogData),
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

  Object.toparams = function ObjecttoParams(obj) {
      var p = [];
      for (var key in obj) {
          p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
  };
 }
    Servicio.actualizarModLog =  function (modLogId, modLogData){
      console.log(modLogData);
      $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
      return $http({
             method: "PUT",
             url: (apiUrl+'modlog/'+modLogId),
             //data : "message=" + versionData,
             data : Object.toparams(modLogData),
             headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
     }).then(
       function success(result){
           // process result and only keep items that match
           var modLogActualizada = result.data;
           return modLogActualizada;
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
    Servicio.deleteModLog = function (modLogId){
       return $http({
              method: "DELETE",
              url: (apiUrl+'modlog/'+modLogId),
              headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
      }).then(
        function success(result){
            // process result and only keep items that match
            var modLogEliminado = result.data;
            console.log("elimino");
            console.log(modLogEliminado);
            return modLogEliminado;
      },
        function error(){
          console.log("Error en la primera promesa");
      });
    }
}
})();
