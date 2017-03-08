'use strict' //Controlador de version
//Cargamos filesystem y path
var fs = require('fs');
var path = require('path');
var mongoosePagination = require("mongoose-pagination");
//cargamos modelos
var Proyecto = require('../models/proyecto');
var Version = require('../models/version');
var ModLog = require('../models/modlog');
//Metodos
//Ver version
function getVersion(req, res) {
  var versionId = req.params.id;
  Version.findById(versionId).populate([{path: 'proyecto'},{path: 'estado'}]).exec((err, version) => {
    if(err) res.status(500).send({message: 'Error en petición version'});
    else{
      if(!version) res.status(404).send({message: 'No existe version'});
      else  res.status(200).send({version});
    }
  });
}
//Guardar version
function saveVersion(req, res){

  var version = new Version();
  var params = req.body;

  version.numero = params.numero;
  version.descripcion = params.descripcion;
  version.estado =params.estado;
  version.proyecto = params.proyecto;

  version.save((err, versionStored)=>{
    if(err) res.status(500).send({message: 'Error al Servidor - saveVersion'});
    else{
      if (!versionStored) res.status(404).send({message: 'No se guardo la version'});
        else  res.status(200).send({version: versionStored});
    }
  });
}
//Listar version
function getVersions(req, res){
//  var params = req.body;
  var proyectoId = req.params.proyecto;
  if(req.params.page) var page = req.params.page;
  else var page = 1;
  var itemPerPage = 6;

  if(!proyectoId){
    var find = Version.find({}).sort([['numero', 'descending']]);
  }
  else{
    var find = Version.find({proyecto: proyectoId}).sort([['numero', 'descending']]);
  }

find.populate({path: 'proyecto'}).paginate(page, itemPerPage).exec((err, versions) =>{
//find.populate({path: 'proyecto'}).paginate({}, { page: 3, limit: 2 }).exec((err, versions) =>{
  if(err) res.status(500).send({message: 'Error al Servidor - getVersion'});
  else{
    //console.log(versions);
    if (!versions) res.status(404).send({message: 'No se encuentran versiones'});
      else  res.status(200).send({versions: versions});
  }
});
}
function getVersionsActive(req, res){
  var params = req.body;// ObjectId("58b010fc66c2123fc13cc95b")
  var proyectoId = req.params.proyecto;
  if(req.params.page) var page = req.params.page;
  else var page = 1;
  var itemPerPage = 6;
  //console.log(proyectoId);
  if(!proyectoId){
    var find = Version.find({estado: ['58b010fc66c2123fc13cc95b','58b0110866c2123fc13cc95c']}).sort('numero');
  }
  else{
    var find = Version.find({proyecto: proyectoId, estado: ['58b010fc66c2123fc13cc95b','58b0110866c2123fc13cc95c']}).sort('numero');

  }

find.populate({path: 'proyecto'}).paginate(page, itemPerPage).exec((err, versions) =>{
  if(err) res.status(500).send({message: 'Error al Servidor - getVersionsActive =>' + proyectoId});
  else{
    if (!versions) res.status(404).send({message: 'No se encuentran versiones activas'});
      else  res.status(200).send({versions: versions});
  }
});
}
//Actualizar version
function updateVersion(req, res) {
  var versionId = req.params.id;
  var update = req.body;
  Version.findByIdAndUpdate(versionId, update, (err, versionUpdated) =>{
    if(err) res.status(500).send({message: 'Error al Servidor - versionUpdate'});
    else{
      if (!versionUpdated) res.status(404).send({message: 'No se actualizo la version'});
      else  res.status(200).send({version: versionUpdated, actualizo: update});
    }
  });
}
//Borrar version
function deleteVersion(req, res){
  var versionId = req.params.id;
  console.log("Version a eliminar -> ");console.log(versionId);
  Version.findByIdAndRemove(versionId, (err, versionRemoved)=>{
    if (err) res.status(500).send({message: 'Error al eliminar version'});
    else {
      if(!versionRemoved)res.status(404).send({message: "No se ha eliminado version"});
      else {
        ModLog.find({album: versionRemoved._id}).remove( (err, modLogRemoved)=>{
          if (err) res.status(500).send({message: 'Error al eliminar modlog'});
          else {
            if(!modLogRemoved) res.status(404).send({message: "No se ha eliminado modlog"});
            else res.status(200).send({message: "Eliminado",version: versionRemoved, modLog: modLogRemoved});
            }
          });
        }//else version
    }//else version
  });//callback version
}
function getNombreVersionById(req, res){
  var versionId = req.params.id;
  Version.findById(proyectoId, (err, version) => {
    if(err) res.status(500).send({message: 'Error en petición version'});
    else{
      if(!version) res.status(404).send({message: 'No existe version'});
      else  res.status(200).send({nombre : version.nombre});
    }
  });

}
//Exportamos modulos
module.exports = {
  getVersion,
  getVersions,
  saveVersion,
  updateVersion,
  deleteVersion,
  getVersionsActive,
  getNombreVersionById
}
