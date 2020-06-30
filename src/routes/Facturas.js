const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.post('/Factura/Id', (req, res)=>{
    var info= req.body;
    const id_pedido= info.id_pedido;
    ///console.log(rfc_cliente);
    pool.query('SELECT *FROM factura_taller WHERE id_pedido = ?',[id_pedido], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos[0]});
        }
    });
});

route.post('/GuardaFactura', (req, res)=>{
    const info = req.body;
    //console.log(info);
    pool.query('INSERT INTO factura_taller SET ?', [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "error"});
        }else{
            res.send({msg: "bien"});
        }
    });
});


module.exports= route;