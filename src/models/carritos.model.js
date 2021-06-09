const Joi = require('joi');
const mongoose = require("mongoose");
const {productosJoiSchema, productosSchema} = require("./productos.model");

const carritosJoiSchema = Joi.object({
    id: Joi.number(), 
    timestamp: Joi.date().timestamp().required(), 
    Products: Joi.array().items(productosJoiSchema)
})

const carritoSchema = new mongoose.Schema({
    timestamp: {type: String, required: true},
    Productos: [productosSchema]
})

const Carritos = mongoose.model("carritos", carritoSchema);

module.exports = {
    carritosJoiSchema: carritosJoiSchema,
    carritoSchema: carritoSchema,
    Carritos: Carritos
}