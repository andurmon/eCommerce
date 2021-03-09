
let ADMIN = true;

function auth(req, res, next){
    if(!ADMIN) return res.status(401).send({ error : -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`});
    next();
}

module.exports = {
    auth: auth
}
