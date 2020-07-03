const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.post('/Usuario', (req, res)=>{
    var info= req.body;
    var correo= info.correo;
    var password= info.pass;
  //  console.log(req.body);
    //console.log(correo + " "+ password);
    pool.query('SELECT *FROM empleado WHERE email = ? AND fecha_nacimiento = ? ', [correo, password], (err, datos)=>{
        if(err){
            res.status(400).send("Ocurrio un error");
        }else{
            if( datos[0] == undefined){
                res.send({info: "mal"});
            }else{
                res.send({info: datos[0]});
            }
            //console.log(datos[0]);
            
        }
    });
});

route.post('/Registro/Empleados', async(req, res)=>{
    const info= req.body;
    //console.log(info);
    pool.query("INSERT INTO empleado SET ?", [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Error"});
            
        }else{
            res.send({msg: "Bien"});
        }
    });
});

route.post('/Empleados', async(req, res)=>{
    pool.query('SELECT *FROM empleado WHERE nombre != "admin"', (err, datos)=>{
        if(err){
            res.status(400).send({msg: "Mal"});
        }else{
            res.send({info: datos});
        }
    });
});

route.post('/Empleados/id', async(req, res)=>{
    const idEmpleado= req.body.idEmpleado;
    pool.query('SELECT *FROM empleado WHERE id_empleado = ?', [idEmpleado], (err, datos)=>{
        if(err){
            res.status(400).send({msg: "Mal"});
        }else{
            //console.log(datos[0]);
            res.send({info: datos[0]});
        }
    });
});

route.post('/Empleados/Eliminarid', async(req, res)=>{
    const idEmpleado= req.body.idEmpleado;
    pool.query('DELETE from empleado WHERE id_empleado = ?', [idEmpleado], (err, exit)=>{
        if(err){
            res.status(400).send({msg: "Bine"});
        }else{
            res.send({info: "Bine"});
        }
    });
});

route.post('/ActualizaEmpleado', (req, res)=>{
    console.log(req.body);
    pool.query('UPDATE empleado SET nombre = ?, estado= ?, ciudad =?, domicilio = ?, telefono= ?, email= ?, cp= ? WHERE email= ?', [req.body.nombre, req.body.estado, req.body.ciudad, req.body.domicilio , req.body.telefono, req.body.email, req.body.cp, req.body.email], (err, confirm)=>{
        if(err){
            res.status(400).send({msg: "Error al Actualizar los datos"});
            console.log(err);
        }else{
            //res.sendFile(path.resolve('src/public/actualizaProducto.html'));
            res.send({msg: "Bien"});
        }
    })
   
});


module.exports= route;