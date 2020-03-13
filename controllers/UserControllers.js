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

    //Este Save permite guardar en la base dato.
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
    let algorithm = 'aes-256-cbc'; // Creamos el algoritmo
    let key = crypto.createCipher(algorithm, password); //Nos permite crear la encriptacion del algoritmo.
    let encriptedPass = key.update(password, 'utf8', 'hex');
    encriptedPass += key.final('hex'); 
    parameters.password = encriptedPass;

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

function encriptation(req, res){
    let password = parameters.password;
    let algorithm = 'aes-256-cbc'; // Creamos el algoritmo
    let key = crypto.createCipher(algorithm, password); //Nos permite crear la encriptacion del algoritmo.
    let encriptedPass = key.update(password, 'utf8', 'hex');
    encriptedPass += key.final('hex'); 
    parameters.password = encriptedPass;
}

module.exports = {
    create,
    update
}