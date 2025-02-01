import express from 'express';

const server = express();

// Routing

server.get('/', (req, res) => {
    const datos = [
        {id: 1, nombre: 'pecas'},
        {id: 2, nombre: 'pecas'}
    ];
    res.json(datos);
});

export default server;