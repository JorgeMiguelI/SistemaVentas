const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');


route.get('/Ventas', function(req, res){
    //console.log(info);
    pool.query('SELECT * FROM venta', (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result} );
        }
    });
    
});


route.post('/RegistroVenta', function(req, res){
    const info= req.body;
    //console.log(info);
    pool.query('INSERT INTO venta SET ?', [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: exit.insertId} );
        }
    });
    
});

route.post('/RegistroVenta/Productos', async (req, res)=>{
    var err= await RegistraDetalleVenta(req)
    if(err){
        res.status(400).send({msg: "mal"})
    }else{
        res.send({msg: "bien"});
    }
});

function RegistraDetalleVenta(req){
    const info =req.body;
    //console.log(info);
    pool.query('INSERT INTO venta_detalle SET ?', [info], (err, exit)=>{
        if(err){
            console.log(err);
            return true;
        }else{
            return false;
        }
    });
}


module.exports= route;