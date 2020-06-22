var CartModel = require('../Models/cartModel');


function getAll() {
    return CartModel.find()

}

// function getIdByName(name) {
//     return CartModel.findOne({name:name})
// }

function newCart(sim, idAgency, idUser, entryPrice, price, commissionAgency, commissionUser, fee, agencySupport,failureCost) {

    return CartModel.create({
        sim: sim,
        idAgency: idAgency,
        idUser: idUser,
        entryPrice: entryPrice,
        price: price,
        commissionAgency: commissionAgency,
        commissionUser: commissionUser,
        fee: fee,
        agencySupport: agencySupport,
        failureCost:failureCost
    })
}

function editStatus(id, status) {
    return CartModel.updateOne({ _id: id }, { status: status })
}
function updateCart(id,sim,idAgency,idUser,entryPrice,price,commissionAgency,commissionUser,fee,agencySupport,failureCost,name){
    return CartModel.updateOne({
        _id:id
    },{
        sim: sim,
        idAgency: idAgency,
        idUser: idUser,
        entryPrice: entryPrice,
        price: price,
        commissionAgency: commissionAgency,
        commissionUser: commissionUser,
        fee: fee,
        agencySupport: agencySupport,
        failureCost:failureCost,
        name:name
    })
}
module.exports = {newCart, editStatus,getAll,updateCart}