var UserModel = require('../Models/userModel')

function updateSalary(id,salary) {
    return UserModel.findByIdAndUpdate(id,{salary:salary})

}
function getAllUser() {
    return UserModel.find()
}
function page(currentPage,dataPerPage){
    return UserModel.find().skip((currentPage-1)*dataPerPage).limit(dataPerPage)
}
function updateUser(id,quantity,salary,name,email,password,commissionUser){
    return UserModel.updateOne({_id:id},{
        quantity:quantity,
        salary:salary,
        name:name,
        email:email,
        password:password,
        commissionUser:commissionUser
    })
}
function deleteUser(id){
    return UserModel.deleteOne({_id:id})
    return UserModel.findByIdAndUpdate(id,{salary:salary},{new:true})
}
function updateCommissionUser(id) {
    
}
module.exports={
    updateSalary,
    getAllUser,
    page,
    updateUser,
    deleteUser
}