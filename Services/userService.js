var UserModel = require('../Models/userModel')

function updateSalary(id,salary) {
    return UserModel.findByIdAndUpdate(id,{salary:salary},{new:true})
}
function updateCommissionUser(id) {
    
}
module.exports={
    updateSalary
}