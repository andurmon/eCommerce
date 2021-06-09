const mongoose = require("mongoose");

//nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar.
const usersSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    address: { type: String, required: true },
    edad: { type: Number, required: true },
    telephone: { type: Number, required: true },
    alias: { type: String, required: true },
    avatar: { type: String, default: "" },
})

const Users = mongoose.model("users", usersSchema);

module.exports = {
    usersSchema: usersSchema,
    Users: Users
}