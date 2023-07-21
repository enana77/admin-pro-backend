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

//bd
dbConection();

app.get('/',( req, resp ) =>{
    resp.json({
        ok:true,
        msg: 'Hola Mundo !!!!!!!!!!!'
    });
});


app.listen( process.env.PORT, () =>{
    console.log('servidor esta corriendo!!!!!!!!!! ' + 3000)
});