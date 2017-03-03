'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BugSchema = Schema ({
    ref: String,
    pantalla: String,
    rejilla: String,
    proceso: String,
    descripcion: String,
    concepto: String,
    usuario: String,
  //  campos: Array,
    modulo: { type: Schema.ObjectId , ref: 'Modulo'},
    estado:  { type: Schema.ObjectId , ref: 'Estado'},
    version: { type: Schema.ObjectId , ref: 'Version'},
    proyecto: { type: Schema.ObjectId , ref: 'Proyecto'},
    modlog: { type: Schema.ObjectId , ref: 'ModLog'},
    resolucion: String
});

module.exports = mongoose.model('Bug', BugSchema);
