const mongoose = require('mongoose'); // Requerimos Mongoose
const app = require('./app');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/bictiaMusic',{useNewUrlParser: true, useUnifiedTopology: true},(error, res)=>{
    if(error){
        console.log("Error de conexión con BD.", error);
    }
    else{
        console.log("Conexión exitosa. Bienvenido Reds.");
        app.listen(port, ()=>{
            console.log("Escuchando en el puerto",port);
        });
    }
});