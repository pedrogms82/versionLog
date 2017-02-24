'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModLogSchema = Schema ({
    numero: Number,
    nombre: String,
    descripcion: String,
  //  campos: Array,
    modulo: { type: Schema.ObjectId , ref: 'Modulo'},
    estado:  { type: Schema.ObjectId , ref: 'Estado'},
    version: { type: Schema.ObjectId , ref: 'Version'},

});

module.exports = mongoose.model('ModLog', ModLogSchema);
