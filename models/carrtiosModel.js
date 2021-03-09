const Joi = require('joi');

module.exports = {
    CarritosModel: Joi.object({
        id: Joi.number(), 
        timestamp: Joi.date().timestamp().required(), 
        nombre: Joi.string().min(3).max(30).required(),
        descripcion: Joi.string().min(5).max(500).required(),
        codigo: Joi.string().min(3).max(30).required(),
        foto: Joi.string().min(3).max(100),
        precio: Joi.number().required(),
        stock: Joi.number().required()
    })
}