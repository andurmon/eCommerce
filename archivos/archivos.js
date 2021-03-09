const fs = require("fs");

function getFromFile(ruta){
    return new Promise((resolve, reject)=>{
        fs.promises.readFile(ruta, 'utf-8')
            .then((items)=>{
                var items_array = JSON.parse(items);
                if (!items_array.length) reject({"error" : `No hay productos cargados`});
                resolve(items_array)
            }).catch((error)=>{
                reject({"error": error})
            })
    })
}

function writeToFile(ruta, data){
    fs.promises.writeFile(ruta, JSON.stringify(data));
}

module.exports = {
    getFromFile: getFromFile,
    writeToFile: writeToFile
}