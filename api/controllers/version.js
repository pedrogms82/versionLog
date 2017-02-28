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
  Version.findById(versionId).populate([{path: 'proyecto'},{path: 'estado'}]).exec((err, version) => {
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
  //console.log(proyectoId);
  if(!proyectoId){
    var find = Version.find({estado: '58b010fc66c2123fc13cc95b'}).sort('numero');
  }
  else{
    var find = Version.find({proyecto: proyectoId, estado: ['58b010fc66c2123fc13cc95b','58b0110866c2123fc13cc95c']}).sort('numero');

  }

find.populate({path: 'proyecto'}).exec((err, versions) =>{
  if(err) res.status(500).send({message: 'Error al Servidor - getVersionsActive =>' + proyectoId});
  else{
    if (!versions) res.status(404).send({message: 'No se encuentran versiones activas'});
      else  res.status(200).send({versions: versions});
  }
});
}
//Actualizar album
function updateVersion(req, res) {
  var versionId = req.params.id;
  var update = req.body;
  // var update = "{";
  // if (req.body.numero) var numero =  req.body.numero; update = update + 'numero:' + "'"+  numero + "',";
  //   if (req.body.descripcion) var descripcion =  req.body.descripcion; update = update + 'descripcion:' + "'" + descripcion + "',";
  //     //if (req.body.estado) var estado =  'ObjectId("' + req.body.estado +  '")'; update = update + 'estado:' + "'" + estado;
  //     if (req.body.estado) var estado =  req.body.estado; update = update + 'estado:' + "'" + estado;
  // update = update + "'}";
//  console.log(update.estado);
  // //console.log(estado);

//  //console.log(update);//console.log(req.body);//console.log(req.params);

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
  deleteVersion,
  getVersionsActive
}
