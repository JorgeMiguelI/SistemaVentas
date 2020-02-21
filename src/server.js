const express= require('express');
const app= express();
const path= require('path');
const bodyParser= require('body-parser');
const mysql= require('mysql');
const util= require('util');

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('./routes/rutas'));

app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), ()=>{
    console.log("Servidor iniciando en el puerto: ", app.get('port'));
});

