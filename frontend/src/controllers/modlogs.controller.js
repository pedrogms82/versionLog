(function () {
'use strict';

angular.module('versionLog')
.constant('apiUrl', "http://localhost:3977/api/")
.controller('proyectoController',proyectoController)
.service('modLogService',modLogService)
.service('versionService',versionService)
