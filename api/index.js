'use strict'

var mongoose = require('mongoose');
var app = require('./app.js');
var port = process.env.PORT || 3010;


mongoose.connect('mongodb://localhost:27017/versionLog', (err, res) => {
    if(err){
      throw err;
    } else {
       console.log("OK - Conexion a la base de datos establecida");

       app.listen(port, function (){
          console.log("OK - Servidor a la escucha en " + port);
       });
    }
});
