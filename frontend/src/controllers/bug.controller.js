(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.controller('bugController',bugController);

bugController.$inject = ['bugService','proyectoService'];
function bugController(bugService, proyectoService) {
    var Controller = this;

    Controller.showListaBugs = true;
    Controller.showCreaBug = false;
    Controller.showEditBug = false;
    Controller.showTodos = false;
    Controller.showAbiertos = true;
    Controller.bugsPage = 1;
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
    //Recogemos los bugs totales
    var promiseBugs = bugService.getBugs();
    promiseBugs.then(
    function success(result){
      Controller.listaBugs = result;
    console.log(Controller.listaBugs);
  //  Controller.listaBugs.showMore = false;
    if (Controller.listaBugs.length == 9) Controller.listaBugs.showMore = true;
    },
    function error(){
      console.log("Error en la segunda promesa");
    });

    Controller.getBugs = function () {
      var promiseBugs = bugService.getBugs();
      promiseBugs.then(
      function success(result){
        Controller.listaBugs = result;
      console.log(Controller.listaBugs);
    //  Controller.listaBugs.showMore = false;
      if (Controller.listaBugs.length == 9) Controller.listaBugs.showMore = true;
      },
      function error(){
        console.log("Error en la segunda promesa");
      });
    }
    Controller.backBugCrear = function (){
      Controller.showListaBugs = true;
      Controller.showCreaBug = false;
    };
    Controller.backBugEdit = function (){
      Controller.showListaBugs = true;
      Controller.showEditBug = false;
    };
    Controller.getBugs = function(pageCount){
      Controller.showTodos = false;
      Controller.showAbiertos = true;
      Controller.showListaBugs = true;
      Controller.showCreaBug = false;
      Controller.showEditBug = false;
      var promiseBugs = bugService.getBugs(pageCount);
      promiseBugs.then(
      function success(result){
      Controller.listaBugs = result;
      },
      function error(){
        console.log("Error en la segunda promesa");
      });
    };

    Controller.getBugsAbiertos = function(pageCount){
      Controller.showTodos = true;
      Controller.showAbiertos = false;
      var promiseBugs = bugService.getBugsAbiertos(pageCount);
      promiseBugs.then(
      function success(result){
      Controller.listaBugs = result;
      },
      function error(){
        console.log("Error en la segunda promesa");
      });
    };
    Controller.nuevoBug = function () {

      Controller.showListaBugs = false;
      Controller.showCreaBug = true;
      Controller.showEditBug = false;
      Controller.showTodos = false;
      Controller.showAbiertos = false;
      Controller.creaBug.estado = 'A';
      var promiseApp = proyectoService.getProyectos();
      promiseApp.then(
      function success(result){
        Controller.listaApps = result;
      console.log(Controller.listaApps);
    //  Controller.listaBugs.showMore = false;

      },
      function error(){
        console.log("Error en la segunda promesa");
      });


    }
    Controller.creaBug = function () {

      console.log("estado creabug");
      console.log(Controller.creaBug.estado);
      if (Controller.creaBug.estado==='A') Controller.creaBug.estado = Controller.Estados[0]._id;
      else if (Controller.creaBug.estado==='P') Controller.creaBug.estado= Controller.Estados[1]._id;
      else if (Controller.creaBug.estado==='F') Controller.creaBug.estado= Controller.Estados[2]._id;
      else Controller.creaBug.estado= Controller.Estados[0]._id;
      console.log("estado");
      console.log(Controller.creaBug.estado);
      if (Controller.creaBug.modulo==='C') Controller.creaBug.modulo= Controller.Modulos[0]._id;
      else if (Controller.creaBug.modulo==='N') Controller.creaBug.modulo= Controller.Modulos[1]._id;
      else if (Controller.creaBug.modulo==='P') Controller.creaBug.modulo= Controller.Modulos[2]._id;
      else if (Controller.creaBug.modulo==='O') Controller.creaBug.modulo= Controller.Modulos[3]._id;
      else Controller.creaBug.modulo = Controller.Modulos[3]._id;
      console.log("modulo");
      console.log(Controller.creaBug.modulo);

    var bugData = {
        ref: Controller.creaBug.ref,
        pantalla: Controller.creaBug.pantalla,
        rejilla: Controller.creaBug.rejilla,
        proceso: Controller.creaBug.proceso,
        descripcion: Controller.creaBug.descripcion,
        concepto: Controller.creaBug.concepto,
        usuario: Controller.creaBug.usuario,
        modulo: Controller.creaBug.modulo,
        estado: Controller.creaBug.estado,
        proyecto: Controller.appSeleccionada
        };
        console.log("bugData");
        console.log(bugData);
        var promiseBug = bugService.crearBug(bugData);
        promiseBug.then(
        function success(result){
          Controller.updateBug = result;
          console.log(Controller.updateBug);
          Controller.getBugs(0,1);
        },
        function error(){
          console.log("Error en la segunda promesa");
        });
    }
    Controller.getBugEdit = function (bugId){

      Controller.showEditBug = true;
      Controller.showCreaBug = false;
      Controller.showListaBugs = false;

      var promiseBug = bugService.getBug(bugId);
      promiseBug.then(
      function success(result){
      Controller.editBug = result.bug;
      console.log("editbug");
      console.log( Controller.editBug);
      console.log("estado.tipo");
      console.log( Controller.editBug.estado.tipo);
      if (Controller.editBug.estado.tipo===Controller.Estados[0].tipo) Controller.editBug.estadoShowA = true;
      else if (Controller.editBug.estado.tipo===Controller.Estados[2].tipo) Controller.editBug.estadoShowF = true;
      },
      function error(){
        console.log("Error en la segunda promesa");
      });
    };
    Controller.actualizarBug = function (bugId) {
      console.log(Controller.editBug.estado);
      if (Controller.editBug.estado==='A') Controller.editBug.estado= Controller.Estados[0]._id;
      else if (Controller.editBug.estado==='F') Controller.editBug.estado= Controller.Estados[2]._id;
      else Controller.editBug.estado= Controller.Estados[0]._id;

        if (Controller.editBug.modulo==='C') Controller.editBug.modulo= Controller.Modulos[0]._id;
        else if (Controller.editBug.modulo==='N') Controller.editBug.modulo= Controller.Modulos[1]._id;
        else if (Controller.editBug.modulo==='P') Controller.editBug.modulo= Controller.Modulos[2]._id;
        else if (Controller.editBug.modulo==='O') Controller.editBug.modulo= Controller.Modulos[3]._id;
        else Controller.editBug.modulo = Controller.Modulos[3]._id;

      console.log("EditBug");
      console.log(Controller.editBug);
      var bugData = {
          _id: Controller.editBug._id,
          ref: Controller.editBug.ref,
          pantalla: Controller.editBug.pantalla,
          rejilla: Controller.editBug.rejilla,
          proceso: Controller.editBug.proceso,
          descripcion: Controller.editBug.descripcion,
          concepto: Controller.editBug.concepto,
          usuario: Controller.editBug.usuario,
          modulo: Controller.editBug.modulo,
          estado: Controller.editBug.estado,
          proyecto: Controller.editBug.proyecto
          };
        console.log("bugData");
        console.log(bugData);
        var promiseBug = bugService.actualizarBug(bugId,bugData);
        promiseBug.then(
        function success(result){
          Controller.updateBug = result;
          console.log(Controller.updateBug);
          Controller.showEditBug = false;
          Controller.showListaBugs = true;
          Controller.getBugs();
        },
        function error(){
          console.log("Error en la segunda promesa");
        });

    }

    Controller.deleteBug = function (bugId){
      console.log("entro");
      console.log(bugId);
      var promiseBug = bugService.deleteBug(bugId);
      Controller.showEditBug = false;
      Controller.showListaBugs = true;
      promiseBug.then(
      function success(result){
      //Controller.listaModLogVersiones = result;
      Controller.getBugs();
      },
      function error(){
        console.log("Error en la segunda promesa");
      });
    };

}//end bugController

})();
