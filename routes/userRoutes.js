const express = require('express');
const UserController = require('../controllers/UserControllers'); //Requerimos el controlador.
const api = express.Router();


//POST: insertar datos privados.
//GET: obeter datos.
//PUT: Modificar información.
//DELETE: eliminar información.

//el API Hace referencia al metodo Router.
api.get('/saludos',(req,res)=>{
    console.log("Primera ruta con express");
});

//Exportar para poder usarlos en otro lado.
api.post('/createUser', UserController.create);
api.put('/updateUser/:id', UserController.update);

module.exports = api;