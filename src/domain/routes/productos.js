const express = require("express");
const router = express.Router();

const { auth } = require("../../middleware/auth");

const { productosJoiSchema, Productos } = require("../models/productos.model");

// const Crud = require("../CRUD/CrudFs");
// let api = new Crud("./data/productos.txt", productosJoiSchema);

const Crud = require("../../CRUD/CrudMongodb");
let api = new Crud(Productos);

router.get('/',  auth, api.get);
router.get('/:id', api.getById);
router.post('/', auth, api.post);
router.put('/:id', auth, api.put);
router.delete('/:id', auth, api.delete);

module.exports =  router;