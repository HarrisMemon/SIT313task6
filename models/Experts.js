const mongoose = require("mongoose")
const expertschema = new mongoose.Schema(
    {
        _id: {type: mongoose.Schema.ObjectId, auto: true},
        name: {
            type: String
        } ,
        address: {
            type: String
        } ,
        mobile: {
            type: Number
        } ,
        password: {
            type: String
        } ,
    }

)
module.exports = mongoose.model("Expert", expertschema)