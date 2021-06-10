require('dotenv').config();
const PORT = process.env.PORT;

//Conexion a la base de datos
const rutaBD = process.env.NODE_CONNECTION;

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const { engine } = require("./src/views/filter");
const passport = require("passport");
const { logger } = require("./src/utils/logger");
const { loginStrategy, signUpStrategy,  serializeUser,  deserializeUser } =  require("./src/middleware/passport/passport");

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

// ------------------- Configuring Template Engine ------------
app.set("views", "./public/views");
app.set("view engine", "ejs");
app.get("/filter", engine );

// ---------------------- Configuring Passport ----------------
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", loginStrategy);
passport.use("signup", signUpStrategy);
passport.serializeUser( serializeUser );
passport.deserializeUser( deserializeUser );

app.post("/login", passport.authenticate("login", {failureRedirect: '/failure'} ), (req, res) => {
    logger.trace("Login con Exito");
    logger.trace(res.req.user);
    res.send("LoginExitoso")
});

app.post("/signup", passport.authenticate("signup", {failureRedirect: '/failure'}), (req, res) => {
    logger.debug("Request Body: ", req.body);
    res.redirect("login")
});

// ------------------- REST Api -------------------------------
const productos = require("./src/domain/routes/productos");
const carritos = require("./src/domain/routes/carritos");

app.use("/api/products", productos);
app.use("/api/carritos", carritos);

app.get("/failure", (req, res) => {
    logger.trace("[GET] - Failure after Login/Signup")
});

http.listen(PORT, ()=>{
    logger.info(`Escuchando en el Puerto: ${PORT}`);
    
    mongoose.connect(rutaBD, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>logger.info("Conexión exitosa a la base de datos"))
        .catch((err)=>logger.error("Error al conectarse a la BD: ", err))
});