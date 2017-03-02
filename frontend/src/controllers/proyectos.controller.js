(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.controller('proyectoController',proyectoController);


proyectoController.$inject = ['proyectoService','versionService' ,'modLogService'];
function proyectoController(proyectoService, versionService, modLogService) {
  var Controller = this;
  //Array de estados
  Controller.Estados = [
  {tipo:'A', _id:'58b010fc66c2123fc13cc95b'},
  {tipo:'P', _id:'58b0110866c2123fc13cc95c'},
  {tipo:'F', _id:'58b0111066c2123fc13cc95d'}
  ];
  Controller.Modulos = [
  {tipo:'C', _id:'58b015b866c2123fc13cc95e'},
  {tipo:'N', _id:'58b015c066c2123fc13cc95f'},
  {tipo:'P', _id:'58b015cb66c2123fc13cc960'},
  {tipo:'O', _id:'58b7ec717a174fcbcfd4a5b4'}
  ];

  Controller.proyectoSeleccionado = false;
  Controller.showProVer = true;
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
    Controller.showProVer = false;
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
    else Controller.editVersion.estado= Controller.Estados[1]._id;
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
        Controller.showEditVersion = false;
        Controller.showProVer = true;
      },
      function error(){
        console.log("Error en la segunda promesa");
      });

}
Controller.nuevoModLog = function () {
  Controller.showModLog = false;
  Controller.showcreaModLog = true;
  Controller.creaModLog.modulo = 'O';
  Controller.creaModLog.estado = 'A';
}
Controller.creaModLog = function () {
  console.log(Controller.creaModLog.estado);
  if (Controller.creaModLog.estado==='A') Controller.creaModLog.estado= Controller.Estados[0]._id;
  else if (Controller.creaModLog.estado==='P') Controller.creaModLog.estado= Controller.Estados[1]._id;
  else if (Controller.creaModLog.estado==='F') Controller.creaModLog.estado= Controller.Estados[2]._id;
  else Controller.creaModLog.estado = Controller.Estados[0]._id;


  if (Controller.creaModLog.modulo==='C') Controller.creaModLog.modulo= Controller.Modulos[0]._id;
  else if (Controller.creaModLog.modulo==='N') Controller.creaModLog.modulo= Controller.Modulos[1]._id;
  else if (Controller.creaModLog.modulo==='P') Controller.creaModLog.modulo= Controller.Modulos[2]._id;
  else if (Controller.creaModLog.modulo==='O') Controller.creaModLog.modulo= Controller.Modulos[3]._id;
  else Controller.creaModLog.modulo = Controller.Modulos[3]._id;

  console.log("estado");
  console.log(Controller.creaModLog.estado);
  console.log("modulo");
  console.log(Controller.creaModLog.modulo);
var modLogData = {
    ref: Controller.creaModLog.ref, //  numero: 'getNextSequenceValue('+Controller.versionSeleccionadaId+')',
    nombre: Controller.creaModLog.nombre,
    descripcion: Controller.creaModLog.descripcion,
    estado: Controller.creaModLog.estado,
    version: Controller.versionSeleccionadaId,
    modulo: Controller.creaModLog.modulo,
    };
    console.log("modLogData");
    console.log(modLogData);
    var promiseVersiones = modLogService.crearModLog(modLogData);
    promiseVersiones.then(
    function success(result){
      Controller.updateModLog = result;
      console.log(Controller.updateModLog);
      Controller.getModLogVersion(Controller.versionSeleccionadaId,1);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
}
Controller.modlogPage = 1;
Controller.getModLogsVersion = function (versionId,pageCount,versionName){
  console.log(pageCount);
  if (!pageCount) pageCount = 1;
  Controller.showProVer = false;
  Controller.showModLog = true;
  Controller.showCreaVersion = false;
  Controller.showEditVersion = false;
  Controller.showcreaModLog = false;
  Controller.modlogPage = pageCount;
  Controller.versionSeleccionadaId = versionId;
  Controller.versionName = versionName;

  var promiseModLog = modLogService.getModLogs(versionId, pageCount);
  promiseModLog.then(
  function success(result){
  Controller.listaModLogVersiones = result;
  Controller.listaModLogVersiones.showMore = false;
  if (Controller.listaModLogVersiones.modlogs.length === 9) Controller.listaModLogVersiones.showMore = true;
  console.log("listaModLogVersiones");
  console.log(Controller.listaModLogVersiones);
  },
  function error(){
    console.log("Error en la segunda promesa");
  });
};
Controller.getModLogEdit = function (modLogId){

  Controller.showEditModLog = true;
  Controller.showCreaModLog = false;
  Controller.showModLog = false;

  var promiseModLog = modLogService.getModLog(modLogId);
  promiseModLog.then(
  function success(result){
  Controller.editModLog = result.modlog;
  console.log( Controller.editModLog);
  if (Controller.editModLog.estado.tipo===Controller.Estados[0].tipo) Controller.editModLog.estadoShowA = true;
  else if (Controller.editModLog.estado.tipo===Controller.Estados[1].tipo) Controller.editModLog.estadoShowP = true;
  else if (Controller.editModLog.estado.tipo===Controller.Estados[2].tipo) Controller.editModLog.estadoShowF = true;
  },
  function error(){
    console.log("Error en la segunda promesa");
  });
};
Controller.actualizarModLog = function (modLogId) {
  console.log(Controller.editModLog);
  if (Controller.editModLog.estado==='A') Controller.editModLog.estado= Controller.Estados[0]._id;
  else if (Controller.editModLog.estado==='P') Controller.editModLog.estado= Controller.Estados[1]._id;
  else if (Controller.editModLog.estado==='F') Controller.editModLog.estado= Controller.Estados[2]._id;
  else Controller.editModLog.estado = Controller.Estados[1]._id;
  console.log("estado");
  console.log(Controller.editModLog.estado);


  if (Controller.editModLog.modulo==='C') Controller.editModLog.modulo= Controller.Modulos[0]._id;
  else if (Controller.editModLog.modulo==='N') Controller.editModLog.modulo= Controller.Modulos[1]._id;
  else if (Controller.editModLog.modulo==='P') Controller.editModLog.modulo= Controller.Modulos[2]._id;
  else if (Controller.editModLog.modulo==='O') Controller.editModLog.modulo= Controller.Modulos[3]._id;
  else Controller.editModLog.modulo = Controller.Modulos[3]._id;
  var modLogData = {
      ref: Controller.editModLog.ref,
      nombre: Controller.editModLog.nombre,
      descripcion: Controller.editModLog.descripcion,
      estado: Controller.editModLog.estado,
      version: Controller.versionSeleccionadaId,
      modulo: Controller.editModLog.modulo,
      };

    console.log("editModLog");
    console.log(modLogData);
    var promiseVersiones = modLogService.actualizarModLog(modLogId,modLogData);
    promiseVersiones.then(
    function success(result){
      Controller.updateModLog = result;
      console.log(Controller.updateModLog);
        Controller.showEditModLog = false;

        Controller.getModLogsVersion(Controller.versionSeleccionadaId,Controller.modlogPage, Controller.versionName);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
}
Controller.deleteModLog = function (modLogId){
  console.log("entro");
  var promiseModLog = modLogService.deleteModLog(modLogId);
  Controller.showEditModLog = false;
  Controller.showModLog = true;
  promiseModLog.then(
  function success(result){
  Controller.listaModLogVersiones = result;
  Controller.getModLogsVersion(Controller.versionSeleccionadaId,1, Controller.versionName);
  },
  function error(){
    console.log("Error en la segunda promesa");
  });
};
Controller.nuevaVersion = function () {
  Controller.showModLog = false;
  Controller.showCreaVersion = true;
  Controller.showEditVersion = false;
  Controller.creaVersion.estado = 'P';
  Controller.showProVer = false;
}
Controller.creaVersion = function () {
  Controller.showModLog = false;
  Controller.showCreaVersion = false;
  Controller.showEditVersion = false;
    Controller.showProVer = true;
  console.log(Controller.creaVersion.estado);
  if (Controller.creaVersion.estado==='A') Controller.creaVersion.estado= Controller.Estados[0]._id;
  else if (Controller.creaVersion.estado==='P') Controller.creaVersion.estado= Controller.Estados[1]._id;
  else if (Controller.creaVersion.estado==='F') Controller.creaVersion.estado= Controller.Estados[2]._id;
  else Controller.creaVersion.estado= Controller.Estados[1]._id;
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
      Controller.getVersionesProyecto(Controller.proyectoSeleccionadoId,1);
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
  Controller.deleteVersion = function (versionId){
    var promiseVersiones = versionService.deleteVersion(versionId);
    Controller.showEditVersion = false;
    Controller.showProVer = true;
    promiseVersiones.then(
    function success(result){
    Controller.listaVersionesProyecto = result;
    Controller.getVersionesProyecto(Controller.proyectoSeleccionadoId,1);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };
  Controller.getModLogVersion = function (versionId){
    Controller.showProVer = false;
    Controller.showModLog = true;
    Controller.showCreaVersion = false;
    Controller.showEditVersion = false;
    Controller.showcreaModLog = false;

    Controller.versionSeleccionadaId = versionId;
    var promiseModLog = modLogService.getModLogs(versionId);
    promiseModLog.then(
    function success(result){
    Controller.listaModLogVersiones = result;
    console.log(Controller.listaModLogVersiones);
    },
    function error(){
      console.log("Error en la segunda promesa");
    });
  };

  Controller.backModLogCrear = function (){
    Controller.showModLog = true;
    Controller.showcreaModLog = false;
  };
  Controller.backVersionCrear = function (){
    Controller.showProVer = true;
    Controller.showCreaVersion = false;
  };
  Controller.backVersionEdit = function (){
    Controller.showProVer = true;
    Controller.showEditVersion = false;
  };
  Controller.backModLogVersion = function (){
    Controller.showProVer = true;
    Controller.showModLog = false;
    Controller.showCreaVersion = false;
    Controller.showEditVersion = false;
  };
  Controller.backModLogs = function (){
    Controller.showModLog = true;
    Controller.showEditModLog = false;
  };


}//proyectoController

})();
