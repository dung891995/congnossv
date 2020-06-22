var CartModel = require('../Models/cartModel');


function getAll() {
    return CartModel.find()

}

// function getIdByName(name) {
//     return CartModel.findOne({name:name})
// }

function newCart(sim, idAgency, idUser, entryPrice, price, commissionAgency, commissionUser, fee, agencySupport, feeIfFalse) {

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
        feeIfFalse:feeIfFalse
    })
}

function editStatus(id, status) {
    return CartModel.updateOne({ _id: id }, { status: status })
}
function updatecart(sim, idAgency, idUser, entryPrice, price, commissionAgency, commissionUser, fee, agencySupport, feeIfFalse){
    return CartModel.updateOne({
        sim: sim,
        idAgency: idAgency,
        idUser: idUser,
        entryPrice: entryPrice,
        price: price,
        commissionAgency: commissionAgency,
        commissionUser: commissionUser,
        fee: fee,
        agencySupport: agencySupport,
        feeIfFalse:feeIfFalse
    })
}
module.exports = {newCart, editStatus,getAll,updatecart}