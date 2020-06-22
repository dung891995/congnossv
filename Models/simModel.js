var mongoose = require('../config/dbConnect');
var simSchema = new mongoose.Schema({
    phoneNumber:Number,
    entryPrice:Number,
    price:Number
},{
    collection:'sim'
})
var SimModel = mongoose.model('sim',simSchema)
module.exports=SimModel
