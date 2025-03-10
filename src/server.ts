import express from 'express';
import router from './router';
import colors from 'colors';
import db from './config/db';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

// Conexion a la BD en render
async function connectDB()
{
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.magenta('Conexion exitosa'));
    } catch (error) {
        // console.log(error);
        console.log(colors.red.bold ('Error al conectar a la BD')); 
    }
}

connectDB();

// Se crea el servidor
const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        console.log(origin);
        
        if(origin === process.env.FRONTEND_URL)
        {
            callback(null, true);
        }
        else
        {
            callback(new Error('Error de CORS'));
        }
        
    }
}

server.use(cors(corsOptions));

// Habilitar el parseo de el cuerpo de las peticiones
server.use(express.json());

// Se habilita morgan
server.use(morgan('dev'));

// Ruteo de las peticiones
server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' });
});

export default server;