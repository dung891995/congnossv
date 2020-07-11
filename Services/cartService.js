var CartModel = require('../Models/cartModel');
var UserService = require('../Services/userService');
var AgencyService = require('../Services/agencyService')


function getAllCart() {
    return CartModel.find()

}
function getCartofUser(id) {
    return CartModel.find({ idUser: id })
}

// function getIdByName(name) {
//     return CartModel.findOne({name:name})
// }
function getCartBySim(sim) {
    return CartModel.findOne({ sim: sim })
}

function newCart(sim, idAgency, idUser, entryPrice, price, fee, agencySupport, feeIfFalse, typeTrade,name,user) {

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
        name:name,
        user:user

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
        var newCart = await CartModel.findByIdAndUpdate({ _id: id }, { status: 'success' }, { new: true }).populate('idUser').populate("idAgency")
        // console.log(newCart);
        if (newCart.status == 'success') {

            if (newCart.typeTrade == "dailygiao") {
                // công cua don hang
                var debitThisCart = newCart.entryPrice * newCart.idAgency.commissionAgency / 100;
                //cong hien tai cua dai li
                var debitOfAgency = newCart.idAgency.debit
                // tổng tiền đại lí nợ
                var newDebit = await AgencyService.updateCredit(newCart.idAgency._id, debitThisCart + debitOfAgency)
            }
            if (newCart.typeTrade == "giaotructiep") {
                // tong tien no dai li cua don hang
                var creditThisCart = newCart.entryPrice - newCart.entryPrice * newCart.idAgency.commissionAgency / 100;
                // no dai li hien tai
                var creditOfAgency = newCart.idAgency.credit
                // tong tien no dai li
                var newCredit = await AgencyService.updateDebit(newCart.idAgency._id, creditThisCart + creditOfAgency)
            }

            //tong thu nhap tren don hang
            var currentIncome = (newCart.entryPrice * newCart.idAgency.commissionAgency / 100) +
                (newCart.price - newCart.entryPrice) - newCart.fee + newCart.agencySupport - newCart.feeIfFalse;
            //user
            // luong cua nhan vien
            var salaryOfUser = newCart.idUser.salary;
            //hoa hong cua nhan vien tren don hang
            var salaryThisCart = newCart.idUser.commissionUser / 100 * currentIncome;
            // tong tien luong cua nhan vien hien tai
            var newSalaryUser = await UserService.updateSalary(newCart.idUser._id, salaryOfUser + salaryThisCart)
            //tong thu nhap
            var newIncome = await CartModel.findByIdAndUpdate(id, { income: currentIncome - salaryOfUser });
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

async function buttonFalse(id) {
    try {
        var newCart = await CartModel.findByIdAndUpdate({ _id: id }, { status: 'fail' }, { new: true })
        console.log(newCart);
        var newIncome = await CartModel.findByIdAndUpdate(id, { income: 0 - newCart.feeIfFalse });
        console.log(newIncome);
        return {
            error: false,
            message: "update thanh cong"
        }
    } catch (error) {
        return {
            error: true,
            message: error
        }
    }
}


function page(npage) {
    return CartModel.find().skip((npage - 1) * 3).limit(3)
}
function pageCart(currentPage,dataPerPage){
    return CartModel.find().skip((currentPage-1)*dataPerPage).limit(dataPerPage)
}
module.exports = { newCart, editStatus, getAllCart, updateIncome, updateStatusCart ,page,getCartofUser,pageCart,getCartBySim}



