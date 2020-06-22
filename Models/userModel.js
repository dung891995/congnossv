var mongoose = require('../config/dbConnect');
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    quantity: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    collection: 'user'
});
var UserModel = mongoose.model('user', userSchema)
module.exports = UserModel