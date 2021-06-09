const Joi = require('joi');
const mongoose = require("mongoose");

const productosJoiSchema = Joi.object({
    id: Joi.number(), 
    timestamp: Joi.date().timestamp().required(), 
    nombre: Joi.string().min(3).max(30).required(),
    descripcion: Joi.string().min(5).max(500).required(),
    codigo: Joi.string().min(3).max(30).required(),
    foto: Joi.string().min(3).max(100),
    precio: Joi.number().required(),
    stock: Joi.boolean().required()
})

const productosSchema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    codigo: {type: String, required: true},
    foto: {type: String, dafault: ""},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
})

const Productos = mongoose.model("productos", productosSchema);

module.exports = {
    productosJoiSchema:  productosJoiSchema,
    productosSchema: productosSchema,
    Productos: Productos
}
