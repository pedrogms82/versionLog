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
//Metodos
function getModLog(req, res) {
  var modLogId = req.params.id;

  ModLog.findById(modLogId).populate([{path: 'modulo'},{path: 'estado'},{path: 'version', populate: { path: 'proyecto', model: 'Proyecto'}}]).exec((err, modlog)=>{
    if(err) res.status(500).send({message: 'Error en el server'});
    else{
      if(!modlog) res.status(404).send({message: 'No existe'});
      else res.status(200).send({modlog});
    }
  });
}
function saveModLog(req, res){
  var modlog = new ModLog();
  var params = req.body;

  console.log("Parametros del ModLog");
  console.log(params);

  modlog.numero = params.numero;
  modlog.nombre = params.nombre;
  modlog.descripcion = params.descripcion;
//  modlog.campos = 'null';
  modlog.modulo = params.modulo;
  modlog.estado = params.estado;
  modlog.version = params.version;

  modlog.save((err, modLogStored) => {
    if(err) res.status(500).send({message: 'Error en el server'});
    else{
      console.log(modLogStored);
      if(!modLogStored) res.status(404).send({message: 'Error guardar Log'});
      else res.status(200).send({modlog: modLogStored});
    }
  });
}
function getModLogs(req, res){
  var versionId = req.params.version;
  if(req.params.page) var page = req.params.page;
  else var page = 1;
  var itemPerPage = 9;

  if(!versionId) var find = ModLog.find({}).sort('numero');
  else var find = ModLog.find({version: versionId}).sort('numero');

  find.populate([
    {path: 'estado'},
    {path: 'modulo'},
    {path: 'version',
    populate: {
      path: 'proyecto',
      model: 'Proyecto'}
    }]
  ).paginate(page, itemPerPage)
  .exec((err, modlogs)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!modlogs) res.status(404).send({message: 'No hay modlogs'});
      else res.status(200).send({modlogs});

    }
  });
}
function updateModLog(req, res){
  var modlogId = req.params.id;
  var update = req.body;

  ModLog.findByIdAndUpdate(modlogId, update, (err, modlogUpdated)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!modlogUpdated) res.status(404).send({message: 'No hay modlogs'});
      else res.status(200).send({modlogUpdated});
    }
  });
}
function deleteModLog (req, res){
  var modlogId = req.params.id;

  ModLog.findByIdAndRemove(modlogId, (err, modlogRemoved)=>{
    if(err) res.status(404).send({message: 'Error server'});
    else {
      if(!modlogRemoved) res.status(404).send({message: 'No hay modlog'});
      else res.status(200).send({message: 'Eliminada',modlogRemoved});
    }
  });
}
//Exportar modulos
module.exports = {
  getModLog,
  saveModLog,
  getModLogs,
  updateModLog,
  deleteModLog
}
