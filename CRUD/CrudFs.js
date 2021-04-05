// File System y Random
const {getFromFile, writeToFile} = require('../archivos/archivos');
const fs = require("fs");

const Joi = require("joi");

class Crud{
	constructor(ruta, JoiSchema){
        this.ruta = ruta;
        this.joiSchema = JoiSchema;

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

    validate(obj, res){
        try{
            Joi.assert(obj, this.joiSchema);            
        }catch(e){
            res.send({"error": e.details[0].message});
            return false;
        }
        return true;
    }

	get(req, res){
        getFromFile(this.ruta)
            .then( products => res.json(products))
            .catch(e => res.send(e));
    }
    
    getById(req, res){
        getFromFile(this.ruta)
        .then( products => {
            let product = products.find((product)=>product.id == req.params.id);
            if (!product) res.status(404).send({"error" : `producto ${req.params.id} no encontrado`});
            res.json(product);
        })
        .catch(e => res.send(e));
	}

	post(req, res){
        let newProduct = req.body;

        if (! this.validate(newProduct, res)) return;

        getFromFile(this.ruta)
        .then( products => {
            let ids = products.map(product => {
                return product.id;
            })
            newProduct.id = Math.max(...ids) + 1;
            products.push(newProduct);

            writeToFile(this.ruta, products);
            res.json(newProduct);
        })
        .catch(e => res.send(e));
    }

    put(req, res){
        let productBody = req.body;
        
        if (! this.validate(productBody, res)) return;

        getFromFile(this.ruta)
        .then( products => {
            let product = products.find((product)=>product.id == req.params.id);
            if (!product) res.status(404).send({"error" : `producto ${req.params.id} no encontrado`});
            let property;
            
            for (property in product) {
                console.log(`${property}: ${product[property]}`);
                if (property === "id") continue;
                product[property] = productBody[property]
            }
            
            writeToFile(this.ruta, products);
            res.json(product)
        })
        .catch(e => res.send(e));
    }

    delete(req, res){
        getFromFile(this.ruta)
        .then( products => {
            let product = products.find((product)=>product.id == req.params.id);
            if (!product) res.status(404).send({"error" : `producto ${req.params.id} no encontrado`});

            let index = products.indexOf(product);
            products.splice(index, 1);

            writeToFile(this.ruta, products);
            res.send(product)
        })
        .catch(e => res.send(e));
    }
}

module.exports = Crud;