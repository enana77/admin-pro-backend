
const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt  = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async( req, resp = response ) =>{
    
    const usuarios = await Usuario.find();
    
    resp.json({
        ok:true,
        usuarios,
        uid:req.uid
    });
}

const crearUsuarios = async( req, resp = response ) =>{
    //grabamos usuarios en la bd el req tiene la data q necesitamos
    const { email, pass } = req.body;

        //trabajo con try catch para controlar errores
    try {

        //valido q el email no exista
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail) {
            return  resp.json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        // creo un usuario con el modelo Usuario con los datos del req
        const usuario = new Usuario( req.body );

        //encriptar constraseña
        const salt = bcrypt.genSaltSync(12);
        usuario.pass =bcrypt.hashSync(pass, salt);
                 
        //grabo en bd
        await usuario.save();

       //generar tokren
        const token =  await generarJWT( usuario.id );
    
        resp.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error inesperado.. consulte log '
        })
    
    }
  
}

const actualizarUsuarios= async ( req, resp = response )=>{
    //validar token 
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            resp.status(404).json({
                ok:false,
                msg: 'usuario no existe con ese id'
            });
        }
        
        //actualizaciones 
        const { pass, google, email, ...campos } = req.body;
        
        if (usuarioDB.email != email){

            const existeEmail = await Usuario.findOne({ email });
            
            if( existeEmail ){
                resp.status(400).json({
                    ok: false,
                    msg: 'Ya existe ususario con ese email'
                });
            }
        }

        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} );

        resp.json({
            ok: true,
            usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: true,
            msg : ' Error inesperado'
        });
    }

}

const borrarUsuario= async (req, resp= response)=>{
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById( uid );

        if( !usuarioDB ) {
            resp.status(404).json({
                ok:false,
                msg: 'El usuario no existe con ese id'
            });
        }

        await Usuario.findByIdAndDelete( uid );
        resp.status(200).json({
            ok:true,
            msg: 'Usuario eliminado' 
        });
        
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'No se pudo borrar el usuario'
        });
        
    }
    
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}