const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth");

const { carritosJoiSchema, Carritos } = require("../models/carritos.model")

// const Crud = require("../CRUD/CrudFs");
// let api = new Crud("./data/carritos.txt", carritosJoiSchema);

const Crud = require("../CRUD/CrudMongodb");
let api = new Crud(Carritos);

router.get('/', api.get);
router.get('/:id', api.getById);
router.post('/', api.post);
router.put('/:id', api.put);
router.delete('/:id', api.delete);

module.exports =  router;