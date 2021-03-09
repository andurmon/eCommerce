const Joi = require('joi');

const {ProductosModel} = require("../models/productosModel");

module.exports = {
    CarritosModel: Joi.object({
        id: Joi.number(), 
        timestamp: Joi.date().timestamp().required(), 
        Products: Joi.array().items(ProductosModel)
    })
}