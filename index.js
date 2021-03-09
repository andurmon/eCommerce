
require('dotenv').config();
const PORT = process.env.PORT;

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const productos = require("./routes/productos");
const carritos = require("./routes/carritos");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productos);
app.use("/api/carritos", carritos);
 
http.listen(PORT, ()=>{
    console.log(`Escuchando en el Puerto: ${PORT}`);
});