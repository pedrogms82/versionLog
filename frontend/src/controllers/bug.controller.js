(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.controller('bugController',bugController);

bugController.$inject = ['bugService'];
function bugController(bugService) {
    var Controller = this;
    Controller.showTodos = false;
    Controller.showAbiertos = true;
    Controller.bugsPage = 1;
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

    Controller.getBugsAbiertos = function(){
      Controller.showTodos = true;
      Controller.showAbiertos = false;
      var promiseBugs = bugService.getBugsAbiertos();
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

}//end bugController

})();
