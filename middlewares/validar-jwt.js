const jwt = require('jsonwebtoken');

const validarJWT = (req, resp, next) =>{

    // leer token 
    const token = req.header('x-token');

    if (!token){
        return resp.status(401).json({
            ok:false,
            msg:' El token no fue enviado'
        });
    }

    try {

        const  { uid } = jwt.verify( token, process.env.JWT_SECRET);
        //console.log(uid);
        req.uid = uid;
        next();
        
    } catch (error) {
        return resp.status(401).json({
            ok:false,
            msg: ' el token no es valido'
        });
    }
}

module.exports={

    validarJWT,

}