var AgencyModel = require('../Models/agencyModel');
function addAgency(name, commissionAgency) {
    return AgencyModel.create({
        name: name,
        commissionAgency: commissionAgency
    })
}

function getALlAgency() {
    return AgencyModel.find()
}

function findbyName(name) {
    return AgencyModel.findOne({name:name})
}
function editAgency(_id, name, commissionAgency) {
    return AgencyModel.updateOne({
        _id: _id
    }, {
        name: name,
        commissionAgency: commissionAgency
    })
}
function deleteAgency(id) {
    return AgencyModel.deleteOne({_id:id})
}
module.exports = {
    addAgency, getALlAgency, editAgency, deleteAgency,findbyName
}