const express= require('express');
const route= express.Router();
const path= require('path');
const pool= require('../server.js')
const fs= require('fs');

route.get('/', (req, res)=>{
    res.sendFile(path.resolve('src/public/index.html'));
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
//
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

route.post('/PedidosTaller/Surtidos', (req, res)=>{
    pool.query('SELECT *FROM pedidotaller WHERE status_surtido = "S"', (err, datos)=>{
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

route.post('/refacciones/categoria', async(req, res)=>{
    var categoria= req.body.categoria;
    console.log(categoria);
    pool.query('SELECT *FROM refaccion WHERE categoria = ?', [categoria], (err, datos)=>{
        if(err){
            res.status(400).send({msg: "Error"});
        }else{
            //console.log(datos);
            res.send({info: datos});
        }
    });
})

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

route.post('/ActualizarExistencia', async (req, res)=>{
    var info= req.body;
    var id_refaccion= info.id_refaccion;
    var newExis= info.cantidad;
    //console.log("CANTIDAD de la Refaccion: "+ id_refaccion);
    pool.query('UPDATE refaccion SET existencia = existencia - ? where id_refaccion = ? ', [newExis, id_refaccion], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "Mal"});
        }else{
            res.send({msg: "Bien"});
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
/*function RegistraVenta(req){
    const info= req.body;
    pool.query('INSERT INTO venta SET ?', [info], (err, exit)=>{
        if(err){
            console.log(err);
            return 0;
        }else{
            console.log(parseInt(exit.insertId));
            return parseInt(exit.insertId);
        }
    });
}*/

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
route.post('/Refacciones/Bajas', (req, res)=>{
    const idRefaccion= req.body.idRefaccion;
    const status= "N";
    pool.query('UPDATE refaccion SET status = ? WHERE id_refaccion = ?', [status, idRefaccion], (err, exit)=>{
        if(err){
            res.status(400).send({msg: "Ha ocurrido un error"});
        }else{
            res.send({msg: "Bien"});
        }
    });
})

route.post('/Refacciones', (req, res)=>{
    const status= "S";
    pool.query('SELECT * FROM refaccion WHERE status = ?', [status], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error')
        }else{
            res.send({info:datos});
        }
    });
});
route.post('/RefaccionesTodas', (req, res)=>{
    pool.query('SELECT * FROM refaccion', (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error')
        }else{
            res.send({info:datos});
        }
    });
});
route.post('/Refacciones/categoria', (req, res)=>{
    const categoria= req.body;
    pool.query('SELECT * FROM refaccion where categoria = ?', [categoria], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error')
        }else{
            res.send({info:datos});
        }
    });
});
route.post('/Refacciones/idRefaccion', (req, res)=>{
    const idRefaccion= req.body.idRefaccion;
    pool.query('SELECT * FROM refaccion where id_refaccion = ?', [idRefaccion], (err, datos)=>{
        if(err){
            res.status(400).send('Ocurrio un error')
        }else{
            //console.log(datos[0]);
            res.send({info:datos[0]});
        }
    });
});

route.post('/Refaccion/RegistroVenta', (req, res)=>{
    const info = req.body;
    console.log(info);
    pool.query('INSERT INTO ventasp SET ?', [info], (err, exit)=>{
        if(err){
            console.log(err);
            res.status(400).send({msg: "error"});
        }else{
            res.send({msg: "bien"});
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


route.post('/RegistroRefaccion', (req, res)=>{
    const status= "S";
    pool.query('insert into refaccion(nombre, Descripcion, Precio_compra, precio_venta, existencia, imagen, categoria) values(?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre, req.body.descripcion, req.body.precioCompra, req.body.precioVenta , req.body.existencia, req.file.originalname, req.body.categoria, status], (err, confirm)=>{
        if(err){
            res.status(400).send({msg: "Error al guardar los datos"});
            console.log(err);
        }else{
            res.send("Se ah Insertado la Refaccion Correctamente");
        }
    })
   
});
route.post('/ActualizaRefaccion', (req, res)=>{
    console.log(req.body);
    pool.query('UPDATE refaccion SET nombre = ?, Descripcion= ?, Precio_compra =?, precio_venta = ?, existencia= ?, categoria= ?, status= ? WHERE nombre= ?', [req.body.nombre, req.body.descripcion, req.body.precioCompra, req.body.precioVenta , req.body.existencia, req.body.categoria, req.body.status, req.body.nombre], (err, confirm)=>{
        if(err){
            res.status(400).send({msg: "Error al Actualizar los datos"});
            console.log(err);
        }else{
            //res.sendFile(path.resolve('src/public/actualizaProducto.html'));
            res.send("Se ah Actualizado la Refaccion Correctamente");
        }
    })
   
});
route.post('/ActualizaEmpleado', (req, res)=>{
    console.log(req.body);
    pool.query('UPDATE empleado SET nombre = ?, estado= ?, ciudad =?, domicilio = ?, telefono= ?, email= ?, cp= ? WHERE email= ?', [req.body.nombre, req.body.estado, req.body.ciudad, req.body.domicilio , req.body.telefono, req.body.email, req.body.cp, req.body.email], (err, confirm)=>{
        if(err){
            res.status(400).send({msg: "Error al Actualizar los datos"});
            console.log(err);
        }else{
            //res.sendFile(path.resolve('src/public/actualizaProducto.html'));
            res.send("Se ah Actualizado el Empleado Correctamente");
        }
    })
   
});

route.get('/piezas', async(req, res)=>{
    pool.query('select * from pieza', (err, data)=>{
        if(err){
            res.status(400).send('Ocurrio un error');
        }else{
            res.send({info: data});
        }
    });
});

module.exports= route;