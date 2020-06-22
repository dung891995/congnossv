var AgencyModel = require('../Models/agencyModel');
function addSim(phoneNumber) {
    req.body.phoneNumber
    return AgencyModel.create({
        phoneNumber:phoneNumber
    })
}

function getALlAgency() {
    return AgencyModel.find()
}
function editAgency(_id,name) {
    return AgencyModel.updateOne({
        _id:_id
    },{
        name:name
    })
}
function deleteAgency(_id) {
    return AgencyModel.deleteOne({_id:_id})
}
module.exports={
    addAgency,getALlAgency,editAgency,deleteAgency,addSim
}