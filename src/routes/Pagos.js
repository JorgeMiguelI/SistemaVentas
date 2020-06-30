const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.post('/registraPago', (req, res)=>{
    const totalPago = req.body.totalpago;
    const idPedido= req.body.idPedido;
    const fecha= req.body.fecha;
    //console.log(info);
    pool.query("INSERT INTO pago_pedidotaller SET ?", [req.body], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "error"});
        }else{
            res.send({msg: "bien"});
        }
    });
});


module.exports= route;