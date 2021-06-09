
require('dotenv').config();
const PORT = process.env.PORT;

//Conexion a la base de datos
const rutaBD = process.env.NODE_CONNECTION;

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const passport = require("passport");
const { logger } = require("./src/utils/logger");
const { loginStrategy, signUpStrategy,  serializeUser,  deserializeUser } =  require("./src/middleware/passport/passport");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ------------------- Configuring Passport -------------------
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", loginStrategy);
passport.use("signup", signUpStrategy);
passport.serializeUser( serializeUser );
passport.deserializeUser( deserializeUser );

app.post("/login", passport.authenticate("login", {failureRedirect: '/login'} ), (req, res) => {
    logger.trace("Hi");
    res.redirect("/productos/vista")
});

app.post("/signup", passport.authenticate("signup", {failureRedirect: '/signup'}), (req, res) => {
    logger.debug("Request Body: ", req.body);
    res.redirect("login")
});

// ------------------- REST Api -------------------------------
const productos = require("./src/routes/productos");
const carritos = require("./src/routes/carritos");

app.use("/api/products", productos);
app.use("/api/carritos", carritos);
 
http.listen(PORT, ()=>{
    logger.info(`Escuchando en el Puerto: ${PORT}`);
    
    mongoose.connect(rutaBD, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>logger.info("Conexión exitosa a la base de datos"))
        .catch((err)=>logger.error("Error al conectarse a la BD: ", err))
});