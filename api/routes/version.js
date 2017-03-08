'use strict' //Rutas de artistas
//Cargamos express y controladores
var express = require('express');
var VersionController = require('../controllers/version');
// Cargamos el router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/album'});
//Creamos las Rutas
api.get('/version/:id', md_auth.ensureAuth, VersionController.getVersion);
api.post('/version', md_auth.ensureAuth, VersionController.saveVersion);
api.get('/version-nombre/:id', md_auth.ensureAuth, VersionController.getNombreVersionById);
api.post('/versiones/:proyecto?/:page?', md_auth.ensureAuth, VersionController.getVersions);
api.post('/versiones-activas/:proyecto?/:page?', md_auth.ensureAuth, VersionController.getVersionsActive);
api.put('/version/:id', md_auth.ensureAuth, VersionController.updateVersion);
api.delete('/version/:id', md_auth.ensureAuth, VersionController.deleteVersion);
// api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
// api.get('/get-image-album/:imageFile', [md_auth.ensureAuth, md_upload], AlbumController.getImageFile);
//exportamos modulos
module.exports = api;
