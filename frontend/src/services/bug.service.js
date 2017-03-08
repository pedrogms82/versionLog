(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://192.168.50.12:3010/api/")
.service('bugService',bugService);

bugService.$inject = ['$http','apiUrl','nameService'];
function bugService($http,apiUrl, nameService){
  var Servicio = this;

  Servicio.getBug = function (bugId){

     return $http({
            method: "GET",
            url: (apiUrl+'bug/'+bugId),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var bugsEncontrados = result.data;
          console.log(bugsEncontrados);
          return bugsEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

  Servicio.getBugs = function (aplicacionId,pageCount){
    if (!aplicacionId) aplicacionId = "0";
     return $http({
            method: "POST",
            url: (apiUrl+'bugs/'+aplicacionId+'/'+pageCount),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var bugsEncontrados = result.data;
          console.log(bugsEncontrados);
          return bugsEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }

  Servicio.getBugsAbiertos = function (pageCount){
     return $http({
            method: "POST",
            url: (apiUrl+'bugs-abiertos/'+pageCount),
            headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
    }).then(
      function success(result){
          // process result and only keep items that match
          var bugsEncontrados = result.data;
          console.log(bugsEncontrados);
          return bugsEncontrados;
    },
      function error(){
        console.log("Error en la primera promesa");
    });
  }
  Servicio.crearBug =  function (bugData){
    console.log(bugData);
    $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
    return $http({
           method: "POST",
           url: (apiUrl+'bug'),
           data : Object.toparams(bugData),
           headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
   }).then(
     function success(result){
         // process result and only keep items that match
         var bugNuevo = result.data;
         return bugNuevo;
   },
     function error(){
       console.log("Error en la primera promesa");
   });
 }
 Servicio.actualizarBug =  function (bugId, bugData){
   console.log("bugData");
   console.log(bugData);
   $http.defaults.headers.common.Authorization = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI';
   return $http({
          method: "PUT",
          url: (apiUrl+'bug/'+bugId),
          //data : "message=" + versionData,
          data : Object.toparams(bugData),
          headers: {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
  }).then(
    function success(result){
        // process result and only keep items that match
        var bugActualizado = result.data;
        return bugActualizado;
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
Servicio.deleteBug = function (bugId){
   return $http({
          method: "DELETE",
          url: (apiUrl+'bug/'+bugId),
          headers: { 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGIwMDg3NzhjMGFmZjBmZGMxMWUwZjkiLCJlbWFpbCI6IndlYm1hc3RlckBtcGRsLm9yZyIsInJvbGUiOiJST0xFX0FETUlOIiwiaW1hZ2UiOiJudWxsIiwiaWF0IjoxNDg3OTMxNTczLCJleHAiOjE0OTA1MTk5NzN9.qSShHvkbzFx5rB61b0n7AIqjoYg72Jwz-7y7Gu_GBgI'}
  }).then(
    function success(result){
        // process result and only keep items that match
        var bugEliminado = result.data;
        console.log("elimino");
        console.log(bugEliminado);
        return bugEliminado;
  },
    function error(){
      console.log("Error en la primera promesa");
  });
}
//Funcion para convertir URL en params
 Object.toparams = function ObjecttoParams(obj) {
     var p = [];
     for (var key in obj) {
         p.push(key + '=' + encodeURIComponent(obj[key]));
     }
     return p.join('&');
 };

}
})();
