var mongoose = require('../config/dbConnect');
var cartSchema = new mongoose.Schema({
    sim: String,
    idAgency: {
        type: String,
        ref: 'agency'
    },
    idUser: {
        type: String,
        ref: 'user'
    },
    entryPrice:Number,
    price:Number,
    commissionAgency: Number,
    commissionUser: Number,
    fee: Number,
    agencySupport: Number,
    failureCost:Number,
    name:String,
    status: {
        type: String,
        default: 'pending'
    }

})
var CartModel = mongoose.model('cart', cartSchema)
module.exports = CartModel
