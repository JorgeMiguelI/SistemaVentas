const express = require('express');
const route = express.Router();
const path = require('path');
const pool = require('../server.js')
const fs = require('fs');

route.get('/piezas', async(req, res) => {
    pool.query('select * from pieza', (err, data) => {
        if (err) {
            res.status(400).send('Ocurrio un error');
        } else {
            res.send({ info: data });
        }
    });
});

route.post('/ActualizaRefaccion', (req, res) => {
    //console.log(req.body);
    pool.query('UPDATE refaccion SET nombre = ?, Descripcion= ?, Precio_compra =?, precio_venta = ?, existencia= ?, categoria= ?, status= ? WHERE nombre= ?', [req.body.nombre, req.body.descripcion, req.body.precioCompra, req.body.precioVenta, req.body.existencia, req.body.categoria, req.body.status, req.body.nombre], (err, confirm) => {
        if (err) {
            res.status(400).send({ msg: "Error al Actualizar los datos" });
            console.log(err);
        } else {
            res.send("Se ah Actualizado la Refaccion Correctamente");
        }
    })
});

route.post('/RefaccionesVenta/idRefaccion', (req, res) => {
    const idRefaccion = req.body.idRefaccion;
    pool.query("SELECT * FROM refaccion WHERE id_refaccion = ?", [idRefaccion], (err, datos) => {
        if (err) {
            res.status(400).send('Ocurrio un error')
        } else {
            //console.log(datos[0]);
            res.send({ info: datos });
        }
    });
});

route.post('/RegistroRefaccion', (req, res) => {
    const status = "S";
    //console.log(req.file.originalname)
    pool.query('insert into refaccion(nombre, Descripcion, Precio_compra, precio_venta, existencia, imagen, categoria, status) values(?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nombre, req.body.descripcion, req.body.precioCompra, req.body.precioVenta, req.body.existencia, req.file.originalname, req.body.categoria, status], (err, confirm) => {
        if (err) {
            res.status(400).send({ msg: "Error al guardar los datos" });
            console.log(err);
        } else {
            res.send("Se ah Insertado la Refaccion Correctamente");
        }
    })

});

route.post('/Refaccion/RegistroVenta', (req, res) => {
    const info = req.body;
    console.log(info);
    pool.query('INSERT INTO ventasp SET ?', [info], (err, exit) => {
        if (err) {
            console.log(err);
            res.status(400).send({ msg: "error" });
        } else {
            res.send({ msg: "bien" });
        }
    });
});

route.post('/Refacciones/idRefaccion', (req, res) => {
    const idRefaccion = req.body.idRefaccion;
    pool.query('SELECT * FROM refaccion where id_refaccion = ?', [idRefaccion], (err, datos) => {
        if (err) {
            res.status(400).send('Ocurrio un error')
        } else {
            //console.log(datos[0]);
            res.send({ info: datos[0] });
        }
    });
});


route.post('/RefaccionesTodas', (req, res) => {
    pool.query('SELECT * FROM refaccion', (err, datos) => {
        if (err) {
            res.status(400).send('Ocurrio un error')
        } else {
            res.send({ info: datos });
        }
    });
});

route.post('/Refacciones', (req, res) => {
    const status = "S";
    pool.query('SELECT * FROM refaccion WHERE status = ?', [status], (err, datos) => {
        if (err) {
            res.status(400).send('Ocurrio un error')
        } else {
            res.send({ info: datos });
        }
    });
});

route.post('/Refacciones/Bajas', (req, res) => {
    const idRefaccion = req.body.idRefaccion;
    const status = "N";
    pool.query('UPDATE refaccion SET status = ? WHERE id_refaccion = ?', [status, idRefaccion], (err, exit) => {
        if (err) {
            res.status(400).send({ msg: "Ha ocurrido un error" });
        } else {
            res.send({ msg: "Bien" });
        }
    });
})

route.post('/ActualizarExistencia', async(req, res) => {
    var info = req.body;
    var id_refaccion = info.id_refaccion;
    var newExis = info.cantidad;
    //console.log("CANTIDAD de la Refaccion: "+ id_refaccion);
    pool.query('UPDATE refaccion SET existencia = existencia - ? where id_refaccion = ? ', [newExis, id_refaccion], (err, exit) => {
        if (err) {
            console.log(err);
            res.status(400).send({ msg: "Mal" });
        } else {
            res.send({ msg: "Bien" });
        }
    });
});

route.post('/refacciones/categoria', async(req, res) => {
    let categoria = req.body.categoria;
    let status="S";
    //console.log(categoria);
    //console.log(categoria);

    pool.query('SELECT *FROM refaccion WHERE categoria = ? AND status= ?', [categoria, status], (err, datos) => {
        if (err) {
            res.status(400).send({ msg: "Error" });
        } else {
            //console.log(datos);
            res.send({ info: datos });
        }
    });
})

module.exports = route;