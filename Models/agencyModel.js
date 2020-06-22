var mongoose = require('../config/dbConnect');
var agencySchema = new mongoose.Schema({
    name:String,
    commissionAgency:Number,
    debit:{
        type:Number,
        default:0
    },
    credit:{
        type:Number,
        default:0
    }
})
var AgencyModel = mongoose.model('agency',agencySchema)
module.exports=AgencyModel
