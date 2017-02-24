'use strict' //Rutas de artistas
//Cargamos express y controladores
var express = require('express');
var ModLogController = require('../controllers/modlog');
// Cargamos el router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/songs'});
//Creamos las Rutas
api.get('/modlog/:id', md_auth.ensureAuth, ModLogController.getModLog);
api.post('/modlog', md_auth.ensureAuth, ModLogController.saveModLog);
api.post('/modlogs/:version?', md_auth.ensureAuth, ModLogController.getModLogs);
api.put('/modlog/:id', md_auth.ensureAuth, ModLogController.updateModLog);
api.delete('/modlog/:id', md_auth.ensureAuth, ModLogController.deleteModLog);
// api.post('/uploadfile/:id', [md_auth.ensureAuth, md_upload], ModLogController.uploadFile);
// api.get('/getfile/:file', [md_auth.ensureAuth, md_upload], ModLogController.getFile);
//exportamos modulos
module.exports = api;
