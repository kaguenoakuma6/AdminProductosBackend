import express from 'express';
import router from './router';
import colors from 'colors';
import db from './config/db';

// Conexion a la BD en render
async function connectDB()
{
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.magenta('Conexion exitosa'));
    } catch (error) {
        console.log(error);
        console.log(colors.red.bold ('Error al conectar a la BD')); 
    }
}

connectDB();

const server = express();

// Habilitar el parseo de el cuerpo de las peticiones
server.use(express.json());

// Ruteo de las peticiones
server.use('/api/products', router);

export default server;