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
    fee: Number,
    agencySupport: Number,
    feeIfFalse:Number,
    typeTrade:String,
    status: {
        type: String,
        default: 'pending'
    },
    income:{
        type:Number,
        default:0
    },
    salaryThisCart:{
        type:Number,
        default:0
    },
    khachHoTro:Number,
    note:{
        type:String,
        default:null
    }
    // createAt:{
    //     type:String,
    //     default:(new Date())
    // },
    // updateAt:{
    //     type:String,
    //     default:null
    // }
},{
    timestamps:true
})
var CartModel = mongoose.model('cart', cartSchema)
module.exports = CartModel
