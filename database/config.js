const mongoose = require('mongoose');

const dbConection = async() =>{

    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log('DB online');

    } catch (error){
        console.error(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports={
    dbConection
}