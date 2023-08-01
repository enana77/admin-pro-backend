 const { response, request } = require('express');
 const Usuario = require('../models/usuario');
 const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async ( req , resp= response ) => {

    const { email, pass } = req.body;

    try {
        //busco un usario en la base que el email
        //verificar email
        const usuarioDB = await Usuario.findOne({ email });
        
        if(!usuarioDB){
            return resp.status(404).json({
                ok:false,
                msg: 'email no valido'
            });
        }

        //validar pass
        const validPass = bcrypt.compareSync( pass, usuarioDB.pass);
        if ( !validPass){
            return resp.status(400).json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        //generar token 
        const token =  await generarJWT( usuarioDB.id );


        resp.json({
            ok: true,
           token
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}