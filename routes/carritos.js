const express = require("express");
const router = express.Router();

const {auth} = require("../middleware/auth");

const {CarritosModel} = require("../models/carrtiosModel")

const Crud = require("./Crud");
let api = new Crud("./data/carritos.txt", CarritosModel);

router.get('/', api.get);
router.get('/:id', api.getById);
router.post('/', api.post);
router.put('/:id', api.put);
router.delete('/:id', api.delete);

module.exports =  router;