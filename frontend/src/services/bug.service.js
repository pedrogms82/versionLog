(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.service('bugService',bugService);

bugService.$inject = ['$http','apiUrl'];
function bugService($http,apiUrl){
  var Servicio = this;

  Servicio.getBugs = function (aplicacionId,pageCount){
     return $http({
            method: "POST",
            url: (apiUrl+'bugs'),
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


}
})();
