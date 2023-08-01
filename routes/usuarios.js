/*
RUTAS '/api/usuarios'
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuario} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router= Router();

router.get('/', validarJWT,getUsuarios);

router.post(
    '/',
    [
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('pass','El password es obligatorio').notEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuarios
    );

    router.put(
        '/:id',
        [
            validarJWT,
            check('nombre','El nombre es obligatorio').notEmpty(),
            check('email','El email es obligatorio').isEmail(),
            check('role','El role es obligatorio').notEmpty(),
            validarCampos
            
        ],
        actualizarUsuarios
        );

        router.delete(
            '/:id',
            [
                validarJWT
            ],
            borrarUsuario
            );
    


module.exports=router;