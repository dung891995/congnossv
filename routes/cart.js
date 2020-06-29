var express = require('express');
var CartService = require('../Services/cartService');
var AgencyService = require('../Services/agencyService');
var UserModel = require('../Models/userModel')
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function (req, res, next) {
    CartService.getAll().populate("idAgency").populate('idUser').then((result) => {
        res.json(result)
    }).catch((err) => {

    });
})
//name,sim,entryPrice,price,commissionAgency,commissionUser,fee,agencySupport
router.post('/', async function (req, res, next) {
    //add cart
    if (isNaN(req.body.entryPrice) || isNaN(req.body.price) || isNaN(req.body.fee) || isNaN(req.body.agencySupport) || isNaN(req.body.feeIfFalse)) {
        res.json({
            error: true,
            message: 'vui long nhap lai'
        })
    } else {
        //get idUser from token
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'dung891995');
        console.log(idUser);
        // get dataUser from idUser
        let dataUser = await UserModel.findById(idUser.id);
        //get idAgency from nameAgency

        let dataAgency = await AgencyService.findbyName(req.body.name);
        console.log(dataAgency);
        let dataCart = await CartService.newCart(
            req.body.sim,
            dataAgency._id,
            idUser.id,
            req.body.entryPrice,
            req.body.price,
            req.body.fee,
            req.body.agencySupport,
            req.body.feeIfFalse,
            'dailygiao'
        )
        res.json(dataCart)
    }

})

router.put('/changestatus/:id', async function (req, res, next) {

    try {
        var newCart = await CartService.editStatus(req.params.id).populate('idUser').populate("idAgency")
        // console.log(newCart)

        if (newCart.status == 'success') {
            //agency
            var debitThisCart = newCart.entryPrice * newCart.idAgency.commissionAgency / 100;
            var debitOfAgency = newCart.idAgency.debit
            var newDebit = await AgencyService.updateDebit(newCart.idAgency._id, debitThisCart + debitOfAgency)
                console.log(newDebit);
                
            var currentIncome = newCart.entryPrice * newCart.idAgency.commissionAgency / 100 +
                (newCart.price - newCart.entryPrice) - newCart.fee + newCart.agencySupport - newCart.feeIfFalse;
            //user
            var salaryOfUser = newCart.idUser.salary;
            var salaryThisCart = newCart.idUser.commissionUser / 100 * currentIncome;

            var newSalaryUser = await UserModel.findByIdAndUpdate(newCart.idUser._id, { salary: salaryOfUser + salaryThisCart })
                console.log(newSalaryUser);
                
            var newIncome = await CartService.updateIncome(req.params.id, currentIncome - salaryOfUser);
                console.log(newIncome);
                
            res.json({
                error: false,
                message: "thanh  cong"
            })
        }
    } catch (error) {
        res.json(error);
    }


})

module.exports = router