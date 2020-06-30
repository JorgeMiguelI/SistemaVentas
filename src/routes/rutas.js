const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.get('/', (req, res)=>{
    res.sendFile(path.resolve('src/public/index.html'));
});

route.post('/bloquea', (req, res)=>{
    pool.query(' LOCK TABLES prueba write ', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:"bien"});
        }
    });
});
route.post('/desbloquea', (req, res)=>{
    pool.query('UNLOCK TABLES', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:"bien"});
        }
    });
});








module.exports= route;