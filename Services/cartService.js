var CartModel = require('../Models/cartModel');


function getAll() {
    return CartModel.find()

}

// function getIdByName(name) {
//     return CartModel.findOne({name:name})
// }

function newCart(sim, idAgency, idUser, entryPrice, price, fee, agencySupport,feeIfFalse,typeTrade) {

    return CartModel.create({
        sim: sim,
        idAgency: idAgency,
        idUser: idUser,
        entryPrice: entryPrice,
        price: price,
        fee: fee,
        agencySupport: agencySupport,
        feeIfFalse: feeIfFalse,
        typeTrade:typeTrade,
        
    })
}

function editStatus(id) {
    return CartModel.findByIdAndUpdate(id, { status: 'success' },{new:true})
}
function updateIncome(id,income) {
    return CartModel.findByIdAndUpdate(id,{income:income},{new:true})
}

module.exports = { newCart, editStatus, getAll,updateIncome }