'use strict' //Controlador de songs
//Cargamos filesystem y path
var fs = require('fs');
var path = require('path');
var mongoosePagination = require("mongoose-pagination");
//cargamos modelos
var Proyecto = require('../models/proyecto');
var Version = require('../models/version');
var ModLog = require('../models/modlog');
var Estado = require('../models/estado');
var Modulo = require('../models/modulo');
var Bug = require('../models/bug');
//Metodos
function getBug(req, res) {
  var bugId = req.params.id;
  console.log("Bug");

  Bug.findById(bugId).populate([{path: 'modulo'},{path: 'estado'},{path: 'version', populate: { path: 'proyecto', model: 'Proyecto'}}]).exec((err, bug)=>{
    if(err) res.status(500).send({message: 'Error en el server'});
    else{
      if(!bug) res.status(404).send({message: 'No existe'});
      else res.status(200).send({bug});
    }
  });
}
function getBugsActive(req, res){

    var params = req.body; // ObjectId("58b010fc66c2123fc13cc95b")
    if(req.params.page) var page = req.params.page;
    else var page = 1;
    var itemPerPage = 9;
    
    var find = Bug.find({estado: ['58b010fc66c2123fc13cc95b','58b0110866c2123fc13cc95c']}).sort('ref');
    find.populate([
        {path: 'estado'},
        {path: 'modulo'},
        {path: 'version'},
        {path: 'proyecto'}
    ]).paginate(page, itemPerPage).exec((err, bugs) =>{
    if(err) res.status(500).send({message: 'Error al Servidor - getbugsActive'});
    else{
      if (!bugs) res.status(404).send({message: 'No se encuentran bugs'});
        else  res.status(200).send({bugs});
    }
  });
}
function saveBug(req, res){
  var bug = new Bug();
  var params = req.body;

  console.log("Parametros del Bug");
  console.log(params);

  bug.ref = params.ref;
  bug.nombre = params.nombre;
  bug.descripcion = params.descripcion;
//  bug.campos = 'null';
  bug.modulo = params.modulo;
  bug.estado = params.estado;
  bug.version = params.version;

  bug.save((err, bugStored) => {
    if(err) res.status(500).send({message: 'Error en el server'});
    else{
      console.log(bugStored);
      if(!bugStored) res.status(404).send({message: 'Error guardar Log'});
      else res.status(200).send({bug: bugStored});
    }
  });
}
function getBugs(req, res){
  var aplicacionId = req.params.aplicacion;
  if(req.params.page) var page = req.params.page;
  else var page = 1;
  var itemPerPage = 9;

  if(!aplicacionId) var find = Bug.find({}).sort('ref');
  else var find = Bug.find({version: aplicacionId}).sort('ref');

  find.populate([
    {path: 'estado'},
    {path: 'modulo'},
    {path: 'version'},
    {path: 'proyecto'}
    ]
  ).paginate(page, itemPerPage)
  .exec((err, bugs)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!bugs) res.status(404).send({message: 'No hay bugs'});
      else res.status(200).send({bugs});

    }
  });
}
function updateBug(req, res){
  var bugId = req.params.id;
  var update = req.body;

  Bug.findByIdAndUpdate(bugId, update, (err, bugUpdated)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!bugUpdated) res.status(404).send({message: 'No hay bugs'});
      else res.status(200).send({bugUpdated});
    }
  });
}
function deleteBug (req, res){
  var bugId = req.params.id;

  Bug.findByIdAndRemove(bugId, (err, bugRemoved)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!bugRemoved) res.status(404).send({message: 'No hay bug'});
      else res.status(200).send({message: 'Eliminada',bugRemoved});
    }
  });
}
//Exportar modulos
module.exports = {
  getBug,
  saveBug,
  getBugs,
  getBugsActive,
  updateBug,
  deleteBug
}
