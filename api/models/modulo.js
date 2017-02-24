'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ModuloSchema = Schema ({
    tipo: String,
    nombre: String
  });

module.exports = mongoose.model('Modulo', ModuloSchema);
