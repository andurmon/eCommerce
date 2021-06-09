
module.exports = class CrudMongo{

	constructor(Model){
        this.Model = Model;

        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.delete = this.delete.bind(this);
    }

	async get(req, res){
        try{
            const docs = await this.Model.find();
            if (!docs.length) { return res.send({"error" : 'No hay productos cargados'});}
            res.send(docs)

        }catch(err){
            console.log(err)
			res.status(400).send({"error" : err.message});
        }
    }
    
    async getById(req, res){
        try{ 
			const document = await this.Model.findOne({_id: req.params.id});
            if (!document) { return res.send({"error" : `producto ${req.params.id} no encontrado`});}
			res.send(document);
		}
		catch(err){
			res.status(400).send({"error" :  `producto ${req.params.id} no encontrado`});
		}
	}

	async post(req, res){
        let newProduct = req.body;

        try{
			const newDocument = await new this.Model(newProduct);
			await newDocument.save(); 
			res.send(newDocument);    
		}
		catch(err){
			res.status(400).send({"error" : err.message});
		}
    }

    async put(req, res){
        let productBody = req.body;

        try{ 
			const document = await this.Model.findOneAndUpdate({_id: req.params.id}, productBody);
			if(!document) return res.status(404).send({"error" :  `producto ${req.params.id} no encontrado`});
			res.send(document);
		}
		catch(err){
			res.status(400).send({"error" : err});
		}
    }

    async delete(req, res){
        let pdtoEliminado = {};

        try{ 
			pdtoEliminado = await this.Model.deleteOne({_id: req.params.id});
			if(!pdtoEliminado) return res.status(404).send({"error" :  `producto ${req.params.id} no encontrado`});
			res.send(pdtoEliminado);
		}
		catch(err){
			res.status(400).send({"error" : err.message});
		}
    }
}