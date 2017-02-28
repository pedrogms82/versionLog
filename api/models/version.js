'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = Schema ({
    numero: String,
    descripcion: String,
    estado: { type: Schema.ObjectId , ref: 'Estado'},
    proyecto: { type: Schema.ObjectId , ref: 'Proyecto'}
});

module.exports = mongoose.model('Version', VersionSchema);
