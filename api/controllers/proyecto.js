'use strict' //Controlador de artistas
//Cargamos filesystem y path
var fs = require('fs');
var path = require('path');
var mongoosePagination = require("mongoose-pagination");
//cargamos modelos
var Version = require('../models/version');
var Proyecto = require('../models/proyecto');
var ModLog = require('../models/modlog');
//Metodos
//ver artistas
function getProyecto(req, res) {
  var proyectoId = req.params.id;
  Proyecto.findById(proyectoId, (err, proyecto) => {
    if(err) res.status(500).send({message: 'Error en petición Proyecto'});
    else{
      if(!proyecto) res.status(404).send({message: 'No existe Proyecto'});
      else  res.status(200).send({proyecto});
    }
  });
}
//Listado de artistas
function getProyectos(req, res){
  if(req.params.page) var page = req.params.page;
  else var page = 1;
    var itemPerPage = 3;
    Proyecto.find().sort('nombre').paginate(page, itemPerPage, function (err, proyectos, total){
        if (err) res.status(500).send({message: 'Error en petición proyectos'});
        else{
          if(!proyectos) res.status(404).send({message: 'No existen proyectos'});
          else  return res.status(200).send({Items: total, proyectos});
        }

    });
}
//Guardar artista
function saveProyecto(req, res){
  var proyecto = new Proyecto();
  var params = req.body;

  proyecto.nombre = params.nombre;
  proyecto.descripcion = params.descripcion;
  proyecto.image = 'null';
  proyecto.save((err, proyectoStored) =>{
    if (err){
      res.status(500).send({message: "Error al guardar proyecto"});
    }else{
      if(!proyectoStored){
        res.status(404).send({message: "No se ha Guardado proyecto"});
      }else{
        res.status(200).send({proyecto: proyectoStored});
      }
    }
  });
}
//Actualizar artista
function updateProyecto(req, res) {
    var proyectoId = req.params.id;
    var update = req.body;


    Proyecto.findByIdAndUpdate(proyectoId, update, (err, proyectoUpdated) => {
      if (err) res.status(500).send({message: 'Error al actualizar Proyecto'});
      else {
        if(!proyectoUpdated){
          res.status(404).send({message: "No se ha encontrado el Proyecto"});
        }else{
          res.status(200).send({message: "Actualizado", artist: proyectoUpdated, datos: update});
        }
      }
    });
}
//Eliminar artista y sus historicos
function deleteProyecto (req, res){
  var proyectoId = req.params.id;

  Proyecto.findByIdAndRemove(proyectoId, (err, proyectoRemoved)=>{
    if (err) res.status(500).send({message: 'Error al eliminar proyecto'});
    else {
      if(!proyectoRemoved) res.status(404).send({message: "No se ha eliminado el proyecto"});
      else {
        Version.find({proyecto: proyectoRemoved._id}).remove( (err, versionRemoved)=>{
          if (err) res.status(500).send({message: 'Error al eliminar Version'});
          else {
            if(!versionRemoved) res.status(404).send({message: "No se ha eliminado el Version"});
            else {
          //    res.status(200).send({message: "Eliminado", version: versionRemoved});
              ModLog.find({version: versionRemoved._id}).remove( (err, modLogRemoved)=>{
                if (err) res.status(500).send({message: 'Error al eliminar ModLog'});
                else {
                  if(!modLogRemoved) res.status(404).send({message: "No se ha eliminado ModLog"});
                  //else res.status(200).send({message: "Eliminado", modlog: modLogRemoved});
                  }
              });
            }//else album
        }//else album
      });//callback album
      res.status(200).send({message: "Eliminado", proyecto: proyectoRemoved});
    }//else artist
  }//else artist
});//Artist find
}
//exportamos modulos
module.exports = {
getProyecto,
getProyectos,
saveProyecto,
updateProyecto,
deleteProyecto
}
