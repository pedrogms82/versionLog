(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.controller('proyectoController',proyectoController)
.service('modLogService',modLogService)
.service('versionService',versionService)
.service('proyectoService',proyectoService);


proyectoController.$inject = ['proyectoService','versionService' ,'modLogService'];
function proyectoController(proyectoService, versionService, modLogService) {
  var Controller = this;

  var promiseProyectos = proyectoService.getProyectos();
  promiseProyectos.then(
  function success(result){
  Controller.listaProyectos = result;
  },
  function error(){
    console.log("Error en la segunda promesa");
  });


  Controller.getVersionesProyecto = function (proyectoId){

    var promiseVersiones = versionService.getVersiones(proyectoId);
    promiseVersiones.then(
    function success(result){
    Controller.listaVersionesProyecto = result;
    console.log(Controller.listaVersionesProyecto);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };

  Controller.getModLogVersion = function (versionId){

    var promiseModLog = modLogService.getModLog(versionId);
    promiseModLog.then(
    function success(result){
    Controller.listaModLogVersiones = result;
    console.log(Controller.listaModLogVersiones);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };


}//proyectoController

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


versionService.$inject = ['$http','apiUrl'];
function versionService($http,apiUrl){
  var Servicio = this;
  Servicio.getVersiones = function (proyectoId){
     return $http({
            method: "POST",
            url: (apiUrl+'versiones/'+proyectoId),
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
}

modLogService.$inject = ['$http','apiUrl'];
function modLogService($http,apiUrl){
  var Servicio = this;
  Servicio.getModLog = function (versionId){
     return $http({
            method: "POST",
            url: (apiUrl+'modlogs/'+versionId),
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
}

})();
