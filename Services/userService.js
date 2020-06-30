var UserModel = require('../Models/userModel')

function updateSalary(id,salary) {
    return UserModel.findByIdAndUpdate(id,{salary:salary})
}
module.exports={
    updateSalary
}