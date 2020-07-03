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

route.get('/VentasEnero', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-01-01' AND '2020-01-31'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});

route.get('/VentasFebrero', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-02-01' AND '2020-02-29'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});

route.get('/VentasMarzo', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-03-01' AND '2020-03-31'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});

route.get('/VentasAbril', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-04-01' AND '2020-04-30'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});

route.get('/VentasMayo', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-05-01' AND '2020-05-31'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});

route.get('/VentasJunio', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-06-01' AND '2020-06-30'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
        }
    });
    
});
route.get('/VentasJulio', function(req, res){
    //console.log(info);
    pool.query("SELECT sum(monto) monto FROM venta WHERE fecha between '2020-07-01' AND '2020-07-31'", (err,result)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(parseInt(exit.insertId));
            res.send({info: result[0].monto} );
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