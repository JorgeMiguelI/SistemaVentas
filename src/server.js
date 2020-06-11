const express= require('express');
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const util= require('util');
const fs= require('fs');
const multer= require('multer')


//Configuraciones
const storage=multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

app.set('port', 3000);

//middlewares (codigos antes de llegar a la ruta)
//Para poder recibir los datos en formato json  ------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/images')
}).single('image'));

app.use(express.static(path.join(__dirname, 'public')));
//-----------------------------------------------------------



//Conexion a la base de Datos -------------------------------
const pool=mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Hola123',
    port: 3304,
    database: 'bdrefaccionaria'
});

pool.getConnection((err, conn)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DB connection was closed');
        }
        if(err.code === 'ER_CON_COUNT ERROR'){
            console.error('DB has too many connections.');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DB connection refused');
        }
    }
    if(conn) 
        conn.release();
    return;
});

pool.query= util.promisify(pool.query);
module.exports= pool;
//------------------------------------------------------------------------

// rutas
app.use(require('./routes/rutas'));



//Iniciamos nuestro servidror -------------------------
app.listen(app.get('port'), ()=>{
    console.log("Servidor iniciando en el puerto: ", app.get('port'));
});
//--------------------------------------------------------------------------------

