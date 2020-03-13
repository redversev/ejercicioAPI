const User = require('../models/User'); // exportamos el modelo.
const crypto = require ('crypto'); //npm install crypto --save

/**
 * FUnción para insertar un usuario.
 * @param {*} req lo quie viene por la url.
 * @param {*} res respuesta.
 */
function create(req, res) {
    var user = new User(); //Nueva instancia del modelo.
    var params = req.body;

    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.password = encriptation(params.password);

    //Este Save permite guardar en la base de datos.
    user.save((error, userCreated) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Error en servidor.'
            })
        }
        else {
            if (!userCreated) {
                res.status(400).send({
                    statusCode: 400,
                    message: 'Error al crear el usuario.'
                })
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: 'Usuario creado satisfactoriamente.',
                    userData: userCreated
                })
            }
        }
    });
}

function update(req, res) {
    let parameters = req.body;
    let id = req.params.id;
    let password = parameters.password;

    //console.log(password);

    if(password === undefined && password ===''){
        console.log("No hay contraseña en ese POST parse!");
    }
    else{
        parameters.password = encriptation(password);
        console.log('El usuario escribió su contraseña "'+password+'" y fue encriptada: ' +parameters.password);
    }

    User.findByIdAndUpdate(id, parameters, (error, userUpdated) => {
        if (error) {
            res.status(500).send({
                message: 'Error en el servidor.',
                statusCode: 500
            })
        }
        else {
            if (!userUpdated) {
                res.status(400).send({
                    message: 'Error al actualizar el usuario',
                    statusCode: 400
                })
            } else {
                res.status(200).send({
                    message: 'Usuario actualizado satisfactoriamente',
                    statusCode: 200
                })
            }
        }
    })
}

function encriptation(password){
    let algorithm = 'aes-256-cbc'; // Creamos el algoritmo
    let key = crypto.createCipher(algorithm, password); //Nos permite crear la encriptacion del algoritmo.
    let encriptedPass = key.update(password, 'utf8', 'hex');
    encriptedPass += key.final('hex'); 
    console.log(encriptedPass);
    return encriptedPass;
}

function login(req, res){
    let params = req.body;

    User.findOne({email: params.email}, (error, UserLogged) =>{
        if(error){
            res.status(500).send(
                {
                    message: 'Error en el servidor',
                    statusCode: 500
                }
            )
        }
        else{
            if(!UserLogged){
                res.status(400).send({
                    message: 'El usuario NO está logueado',
                    statusCode: 400
                })
            }
            else{
                let password = encriptation(params.password);
                if(password === UserLogged.password){
                    res.status(200).send({
                        message: 'Los datos son correctos',
                        statusCode: 200
                    })
                }
                else{
                    res.status(401).send({
                        message: 'La contraseña es inválida',
                        statusCode: 401
                    })
                }
            }
        }
    })
}

//Función nueva para obtener la lista de usarios
function getUsers(req, res){

    User.find({},(error, Users) =>{
        if(error){
            res.status(500).send(
                {
                    message: 'Error en el servidor',
                    statusCode: 500
                }
            )
        }
        else{
            console.log("A continuación la lista de Users");
            console.log(Users);
            res.json(Users);
        }
    })
}

module.exports = {
    create,
    update,
    login,
    getUsers
}