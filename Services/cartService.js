var CartModel = require('../Models/cartModel');
var UserService = require('../Services/userService');
var AgencyService = require('../Services/agencyService')


function getAll() {
    return CartModel.find()

}

// function getIdByName(name) {
//     return CartModel.findOne({name:name})
// }

function newCart(sim, idAgency, idUser, entryPrice, price, fee, agencySupport, feeIfFalse, typeTrade) {

    return CartModel.create({
        sim: sim,
        idAgency: idAgency,
        idUser: idUser,
        entryPrice: entryPrice,
        price: price,
        fee: fee,
        agencySupport: agencySupport,
        feeIfFalse: feeIfFalse,
        typeTrade: typeTrade,

    })
}

function editStatus(id) {
    return CartModel.findByIdAndUpdate(id, { status: 'success' }, { new: true })
}
function updateIncome(id, income) {
    return CartModel.findByIdAndUpdate(id, { income: income }, { new: true })
}

async function updateStatusCart(id) {
   
    try {
        var newCart = await CartModel.findByIdAndUpdate({_id:id}, { status: 'success' },{new:true}).populate('idUser').populate("idAgency")
        
        if (newCart.status == 'success') {

            if (newCart.typeTrade == "dailygiao") {
                var debitThisCart = newCart.entryPrice * newCart.idAgency.commissionAgency / 100;
                var debitOfAgency = newCart.idAgency.debit
                var newDebit = await AgencyService.updateCredit(newCart.idAgency._id, debitThisCart + debitOfAgency)
            }
            if (newCart.typeTrade == "giaotructiep") {
                var creditThisCart = newCart.entryPrice - newCart.entryPrice * newCart.idAgency.commissionAgency / 100;
                var creditOfAgency = newCart.idAgency.credit
                var newCredit = await AgencyService.updateDebit(newCart.idAgency._id, creditThisCart + creditOfAgency)
            }


            var currentIncome = (newCart.entryPrice * newCart.idAgency.commissionAgency / 100 )+
                (newCart.price - newCart.entryPrice) - newCart.fee + newCart.agencySupport - newCart.feeIfFalse;
            //user
            var salaryOfUser = newCart.idUser.salary;
            var salaryThisCart = newCart.idUser.commissionUser / 100 * currentIncome;
            var newSalaryUser = await UserService.updateSalary(newCart.idUser._id, salaryOfUser + salaryThisCart)
            var newIncome = await CartModel.findByIdAndUpdate(id, { income: currentIncome - salaryOfUser});
            return {
                error: false,
                message: "cap nhat thanh cong"
            }
        }
    } catch (error) {
        return {
            error: true,
            message: error
        }
    }

}

function page(npage) {
    return UserModel.find().skip((npage - 1) * 3).limit(3)
}
module.exports = { newCart, editStatus, getAll, updateIncome, updateStatusCart ,page}