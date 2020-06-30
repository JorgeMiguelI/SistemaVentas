const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.post('/clientes/registro', (req, res)=>{
    const info=req.body;
    pool.query('INSERT INTO cliente SET ?', [info], (err, exit)=>{
        if(err){
            res.status(400).send('Ah ocurrido un error');
        }else{
            res.send({msg: "bien"});
        }
    });
});

route.post('/Clientes/Id', (req, res)=>{
    var info= req.body;
    const rfc_cliente= info.rfc_cliente;
    console.log(rfc_cliente);
    pool.query('SELECT *FROM cliente WHERE rfc_cliente = ?',[rfc_cliente], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos[0]});
        }
    });
});

route.get('/Clientes', (req, res)=>{
    pool.query('SELECT *FROM cliente', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
});

module.exports= route;