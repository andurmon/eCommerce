
require('dotenv').config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose")

//Conexion a la base de datos
let rutaBD = process.env.NODE_CONNECTION;

mongoose.connect(rutaBD, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log("Conexión exitosa a la base de datos"))
    .catch((err)=>console.error("Error al conectarse a la BD: ", err))

const productos = require("./src/routes/productos");
const carritos = require("./src/routes/carritos");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productos);
app.use("/api/carritos", carritos);
 
http.listen(PORT, ()=>{
    console.log(`Escuchando en el Puerto: ${PORT}`);
});