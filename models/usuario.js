//importamos mongoose para armar los modelos o tablas
const { Schema, model } = require('mongoose');

//creamos un esquema de Usuario
const UsuarioSchema = Schema({

    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    pass:{
        type: String,
        require: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'USER_ROLE'

    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuarioSchema.method( 'toJSON', function(){
    const {__v, _id, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario',UsuarioSchema);