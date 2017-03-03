'use strict' //Rutas de artistas
//Cargamos express y controladores
var express = require('express');
var BugController = require('../controllers/bug');
// Cargamos el router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/songs'});
//Creamos las Rutas
api.get('/bug/:id', md_auth.ensureAuth, BugController.getBug);
api.post('/bug', md_auth.ensureAuth, BugController.saveBug);
api.post('/bugs/:proyecto?/:page?', md_auth.ensureAuth, BugController.getBugs);
api.post('/bugs-abiertos/:page?', md_auth.ensureAuth, BugController.getBugsActive);
api.put('/bug/:id', md_auth.ensureAuth, BugController.updateBug);
api.delete('/bug/:id', md_auth.ensureAuth, BugController.deleteBug);
// api.post('/uploadfile/:id', [md_auth.ensureAuth, md_upload], BugController.uploadFile);
// api.get('/getfile/:file', [md_auth.ensureAuth, md_upload], BugController.getFile);
//exportamos modulos
module.exports = api;
