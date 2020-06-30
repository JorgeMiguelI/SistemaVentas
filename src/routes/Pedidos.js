const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.post('/ActualizaStatusSurtido', async (req, res)=>{
    var info= req.body;
    var id_pedido= info.id_pedido;
    //console.log("CANTIDAD de la Refaccion: "+ id_refaccion);
    pool.query('UPDATE pedidotaller SET status_surtido = "S" WHERE id_pedido= ?', [id_pedido], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            res.send({msg: "Bien"});
        }
    });
});

route.post('/RegistroPedido', (req, res)=>{
    const info= req.body;
    pool.query("INSERT INTO pedidofabrica SET ?", [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Error"});
            
        }else{
            //console.log(exit.insertId);
            res.send({idPedido: exit.insertId});
        }
    });
    
});


route.post('/RegistroPedido/Detalles', (req, res)=>{
    const info= req.body;
    pool.query("INSERT INTO detalle_pedido SET ?", [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Error"});
            
        }else{
            //console.log(exit.insertId);
            res.send({msg: "Bien"});
        }
    });
})

route.post('/detallesPedidoTaller', (req, res)=>{
    const idPedido= req.body.PedidoId;
    pool.query('SELECT *FROM refaccion_pedidotaller WHERE id_pedido = ?', [idPedido] , (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})

route.post('/detallesPedido', (req, res)=>{
    const idPedido= req.body.PedidoId;
    pool.query('SELECT *FROM detalle_pedido WHERE id_pedido = ?', [idPedido] , (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})

route.post('/Pedidos/Surtidos', (req, res)=>{
    pool.query('SELECT *FROM pedidofabrica WHERE status_envio = "SI"', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})

route.post('/PedidosTaller/Surtidos', (req, res)=>{
    pool.query('SELECT *FROM pedidotaller WHERE status_surtido = "S"', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})

route.post('/Pedidos/NoSurtidos', (req, res)=>{
    pool.query('SELECT *FROM pedidofabrica WHERE status_envio = "NO"', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})
route.post('/PedidosTaller/NoSurtidos', (req, res)=>{
    pool.query('SELECT *FROM pedidotaller WHERE status_surtido = "N"', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
})

route.post('/DatosPedido/Id', (req, res)=>{
    var info= req.body;
    const id_pedido= info.id_Ped;
    ///console.log(rfc_cliente);
    pool.query('SELECT R.id_refaccion, R.nombre, R.precio_venta, cantidad FROM refaccion R, refaccion_pedidotaller RP WHERE R.id_refaccion = RP.id_refaccion and RP.id_pedido= ? ',[id_pedido], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info:datos});
        }
    });
});

route.get('/pedidosTaller', (req, res)=>{
    pool.query("SELECT * FROM pedidotaller", (err, datos)=>{
        if(err){
            console.log(err);
            res.status(400).send('Ocurrio un error');
        }else{
            
            res.send({info: datos});
        }
    });
})

route.post('/pedidosTaller/Id', (req, res)=>{
    const idPedido= req.body.idPedido;
    pool.query("SELECT * FROM pedidotaller WHERE id_pedido = ?",[idPedido], (err, datos)=>{
        if(err){
            console.log(err);
            res.status(400).send('Ocurrio un error');
        }else{
            
            res.send({info: datos[0]});
        }
    });
})

route.post('/getTotalPagos', (req, res)=>{
    const idPedido= req.body.idPedido;
    pool.query("SELECT SUM(monto) totalPagado FROM pago_pedidotaller WHERE idPedido = ?",[idPedido], (err, datos)=>{
        if(err){
            console.log(err);
            res.status(400).send('Ocurrio un error');
        }else{
            
            res.send({info: datos[0].totalPagado});
        }
    });
})

route.post('/Actualizaestatuspedido', async (req, res)=>{
    var info= req.body;
    var idPedido= info.idPedido;
    //console.log("CANTIDAD de la Refaccion: "+ id_refaccion);
    pool.query("UPDATE pedidotaller SET estatus_pago = 'S' WHERE id_pedido= ?", [idPedido], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            res.send({msg: "Bien"});
        }
    });
});


module.exports= route;