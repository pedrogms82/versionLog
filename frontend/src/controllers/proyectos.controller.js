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
  //Array de estados
  Controller.Estados = [
  {tipo:'A', _id:'58b010fc66c2123fc13cc95b'},
  {tipo:'P', _id:'58b0110866c2123fc13cc95c'},
  {tipo:'F', _id:'58b0111066c2123fc13cc95d'}
];
  Controller.proyectoSeleccionado = false;
  var promiseProyectos = proyectoService.getProyectos();
  promiseProyectos.then(
  function success(result){
  Controller.listaProyectos = result;
  },
  function error(){
    console.log("Error en la segunda promesa");
  });

  Controller.getVersionEdit = function (versionId){

    var promiseVersiones = versionService.getVersion(versionId);
    promiseVersiones.then(
    function success(result){
    Controller.editVersion = result.version;
    console.log( Controller.editVersion);
    if (Controller.editVersion.estado.tipo===Controller.Estados[0].tipo) Controller.editVersion.estadoShowA = true;
    else if (Controller.editVersion.estado.tipo===Controller.Estados[1].tipo) Controller.editVersion.estadoShowP = true;
    else if (Controller.editVersion.estado.tipo===Controller.Estados[2].tipo) Controller.editVersion.estadoShowF = true;
    Controller.showEditVersion = true;
    Controller.showCreaVersion = false;
    Controller.showModLog = false;
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };
  Controller.actualizarVersion = function (versionId) {
    console.log(Controller.editVersion.estado);
    if (Controller.editVersion.estado==='A') Controller.editVersion.estado= Controller.Estados[0]._id;
    else if (Controller.editVersion.estado==='P') Controller.editVersion.estado= Controller.Estados[1]._id;
    else if (Controller.editVersion.estado==='F') Controller.editVersion.estado= Controller.Estados[2]._id;
    console.log("estado");
    console.log(Controller.editVersion.estado);
  var versionData = {
      numero: Controller.editVersion.numero,
      descripcion: Controller.editVersion.descripcion,
      estado: Controller.editVersion.estado

      };
      console.log("versionData");
      console.log(versionData);
      var promiseVersiones = versionService.actualizarVersion(versionId,versionData);
      promiseVersiones.then(
      function success(result){
        Controller.updateVersion = result;
        console.log(Controller.updateVersion);
      },
      function error(){
        console.log("Error en la segunda promesa");
      });

}
Controller.nuevaVersion = function () {
  Controller.showModLog = false;
  Controller.showCreaVersion = true;
  Controller.showEditVersion = false;
}
Controller.creaVersion = function () {
  Controller.showModLog = false;
  Controller.showCreaVersion = true;
  Controller.showEditVersion = false;
  console.log(Controller.creaVersion.estado);
  if (Controller.creaVersion.estado==='A') Controller.creaVersion.estado= Controller.Estados[0]._id;
  else if (Controller.creaVersion.estado==='P') Controller.creaVersion.estado= Controller.Estados[1]._id;
  else if (Controller.creaVersion.estado==='F') Controller.creaVersion.estado= Controller.Estados[2]._id;
  console.log("estado");
  console.log(Controller.creaVersion.estado);
var versionData = {
    numero: Controller.creaVersion.numero,
    descripcion: Controller.creaVersion.descripcion,
    estado: Controller.creaVersion.estado,
    proyecto: Controller.proyectoSeleccionadoId
    };
    console.log("versionData");
    console.log(versionData);
    var promiseVersiones = versionService.crearVersion(versionData);
    promiseVersiones.then(
    function success(result){
      Controller.updateVersion = result;
      console.log(Controller.updateVersion);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
}
  Controller.versionPage = 1;
  Controller.getVersionesProyecto = function (proyectoId,pageCount){
    Controller.versionPage = pageCount;
    //Marcamos el proyecto en el root scope
    Controller.proyectoSeleccionado = true;
    Controller.proyectoSeleccionadoId = proyectoId

    var promiseVersiones = versionService.getVersiones(proyectoId,pageCount);
    promiseVersiones.then(
    function success(result){
    Controller.listaVersionesProyecto = result;
    Controller.listaVersionesProyecto.showMore = false;

    if (Controller.listaVersionesProyecto.versions.length == 6) Controller.listaVersionesProyecto.showMore = true;
    for (var i = 0; i < Controller.listaVersionesProyecto.versions.length; i++)
      Controller.listaVersionesProyecto.versions[i].numVersion = Controller.listaVersionesProyecto.versions[i].numero.charAt(0) + "." + Controller.listaVersionesProyecto.versions[i].numero.charAt(1) + "." + Controller.listaVersionesProyecto.versions[i].numero.charAt(2);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };
  Controller.getVersionesProyectoActivas = function (proyectoId){
    Controller.proyectoSeleccionado = true;
    var promiseVersiones = versionService.getVersionesActivas(proyectoId);
    promiseVersiones.then(
    function success(result){
    Controller.listaVersionesProyecto = result;
    for (var i = 0; i < Controller.listaVersionesProyecto.versions.length; i++)
      Controller.listaVersionesProyecto.versions[i].numVersion = Controller.listaVersionesProyecto.versions[i].numero.charAt(0) + "." + Controller.listaVersionesProyecto.versions[i].numero.charAt(1) + "." + Controller.listaVersionesProyecto.versions[i].numero.charAt(2);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };
  Controller.getModLogVersion = function (versionId){

    Controller.showModLog = true;
    Controller.showCreaVersion = false;
    Controller.showEditVersion = false;
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
      function error(){
        console.log("Error en la primera promesa");
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
