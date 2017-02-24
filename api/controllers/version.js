'use strict' //Controlador de albumas
//Cargamos filesystem y path
var fs = require('fs');
var path = require('path');
var mongoosePagination = require("mongoose-pagination");
//cargamos modelos
var Proyecto = require('../models/proyecto');
var Version = require('../models/version');
var ModLog = require('../models/modlog');
//Metodos
//Ver verson
function getVersion(req, res) {
  var versionId = req.params.id;

  Version.findById(versionId).populate({path: 'proyecto'}).exec((err, version) => {
    if(err) res.status(500).send({message: 'Error en petición version'});
    else{
      if(!version) res.status(404).send({message: 'No existe version'});
      else  res.status(200).send({version});
    }
  });
}
//Guardar Album
function saveVersion(req, res){

  var version = new Version();
  var params = req.body;

  console.log(params);
  version.numero = params.numero;
  version.descripcion = params.descripcion;
  version.estado =null;
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

  if(!proyectoId){
    var find = Version.find({}).sort('numero');
  }
  else{
    var find = Version.find({proyecto: proyectoId}).sort('numero');
  }

find.populate({path: 'proyecto'}).exec((err, versions) =>{
  if(err) res.status(500).send({message: 'Error al Servidor - getVersion'});
  else{
    if (!versions) res.status(404).send({message: 'No se encuentran albums'});
      else  res.status(200).send({version: versions});
  }
});
}
//Actualizar album
function updateVersion(req, res) {
  var versionId = req.params.id;
  var update = req.body;

//  console.log(update);console.log(req.body);console.log(req.params);

  Version.findByIdAndUpdate(versionId, update, (err, versionUpdated) =>{
    if(err) res.status(500).send({message: 'Error al Servidor - versionUpdate'});
    else{
      if (!versionUpdated) res.status(404).send({message: 'No se actualizo la version'});
      else  res.status(200).send({version: versionUpdated, actualizo: update});
    }
  });
}
//Borrar Album
function deleteVersion(req, res){
  var versionId = req.params.id;

  Version.findByIdAndRemove(versionId, (err, versionRemoved)=>{
    if (err) res.status(500).send({message: 'Error al eliminar version'});
    else {
      if(!versionRemoved)res.status(404).send({message: "No se ha eliminado version"});
      else {
        ModLog.find({album: versionRemoved._id}).remove( (err, modLogRemoved)=>{
          if (err) res.status(500).send({message: 'Error al eliminar modlog'});
          else {
            if(!modLogRemoved) res.status(404).send({message: "No se ha eliminado songs"});
            else res.status(200).send({message: "Eliminado",version: versionRemoved, modLog: modLogRemoved});
            }
          });
        }//else album
    }//else album
  });//callback album
}
//Exportamos modulos
module.exports = {
  getVersion,
  getVersions,
  saveVersion,
  updateVersion,
  deleteVersion
}
