'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Creo app
var app = express();

//Rutas

var userRoutes = require('./routes/user');
var proyectoRoutes = require('./routes/proyecto');
var versionRoutes = require('./routes/version');
var modLogRoutes = require('./routes/modlog');
var bugRoutes = require('./routes/bug');
var UserController = require('./controllers/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cabeceras http
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  res.header('Access', 'GET,POST,OPTIONS,PUT,DELETE');

  next();
});
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//rutas base
app.use('/api', [userRoutes, proyectoRoutes, versionRoutes, modLogRoutes, bugRoutes]);

//Asi seria sin el Router
// app.post('/signup', UserController.saveUser);
// app.post('/login', UserController.loginUser);
//Ejemplos
app.get('/signup', function (req, res){
   res.status(200).send({message: "Ok - Pagina de signup"});
});
app.get('/pruebas', function (req, res){
   res.status(200).send({message: "Ok - Carga prueba correcta"});
});

module.exports = app;
