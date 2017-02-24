'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoSchema = Schema ({
    tipo: String,
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('Estado', EstadoSchema);
