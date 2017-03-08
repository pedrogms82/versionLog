'use strict' //Rutas de artistas
//Cargamos express y controladores
var express = require('express');
var ProyectoController = require('../controllers/proyecto');
// Cargamos el router de express
var api = express.Router();
var md_auth = require('../middlewares/authenticated');
// var multipart = require('connect-multiparty');
// var md_upload = multipart({uploadDir: './uploads/artists'});
//Creamos las Rutas
api.get('/proyecto/:id', md_auth.ensureAuth, ProyectoController.getProyecto);
api.get('/proyecto-nombre/:id', md_auth.ensureAuth, ProyectoController.getNombreProyectoById);
api.get('/proyectos/:page?', md_auth.ensureAuth, ProyectoController.getProyectos);
api.post('/proyecto', md_auth.ensureAuth, ProyectoController.saveProyecto);
api.put('/proyecto/:id', md_auth.ensureAuth, ProyectoController.updateProyecto);
api.delete('/proyecto/:id', md_auth.ensureAuth, ProyectoController.deleteProyecto);
// api.post('/upload-image-artist/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
// api.get('/get-image-artist/:imageFile', [md_auth.ensureAuth, md_upload], ArtistController.getImageFile);
//exportamos modulos
module.exports = api;
