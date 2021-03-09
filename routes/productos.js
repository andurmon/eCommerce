const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth");

const {ProductosModel} = require("../models/productosModel");

const Crud = require("./Crud");
let api = new Crud("./data/productos.txt", ProductosModel);

router.get('/',  auth, api.get);
router.get('/:id', api.getById);
router.post('/', auth, api.post);
router.put('/:id', auth, api.put);
router.delete('/:id', auth, api.delete);

module.exports =  router;