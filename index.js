require('dotenv').config();

//CREAR EL SERVIDOR EXPRESS
const express = require('express');
const cors = require('cors');

//importa la cadena de conecciona  la bd
//mongodb
const { dbConection } = require('./database/config');
const app =express();

//configurar cors
app.use( cors() );

//lectura y parseo del body
app.use( express.json() );

//bd
dbConection();

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen( process.env.PORT, () =>{
    console.log('servidor esta corriendo!!!!!!!!!! ' + 3000)
});