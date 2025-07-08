const mongodb = require('mongoose');
const RegiseterSchema = mongodb.Schema({
    username: String,
    email: String,
    password: String,
    specialization:String,
    role: String,
    company: String,
    experience: Number,
    level :String
})

const register_schema = mongodb.model("register", RegiseterSchema);
module.exports = register_schema;