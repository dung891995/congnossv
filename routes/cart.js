var express = require('express');
var CartService = require('../Services/cartService');
var AgencyService = require('../Services/agencyService');
var UserModel = require('../Models/userModel')
var router = express.Router();  
var jwt = require('jsonwebtoken');
const UserService = require('../Services/userService');
const {authToken} =require('../Middleware/userAuth');
router.get('/', function (req, res, next) { 
    let textSearch=req.query.textSearch
    CartService.getAll({'sim':{ '$regex': `${textSearch}`}}).then((result) => {
 
        res.json(result); 
        // console.log(result[0]);
        // console.log(result[7].createdAt.toLocaleString());
        // res.json(result[7].createdAt.toLocaleString())
    }).catch((err) => {

    });
})
router.get('/getcartofuser', function (req, res, next) {
    var token = req.cookies.token;
    var idUser = jwt.verify(token, 'dung891995');
    console.log(idUser);
    cartService.getCartofUser(idUser.id).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
})
//name,sim,entryPrice,price,commissionAgency,commissionUser,fee,agencySupport
router.post('/', async function (req, res, next) {

    //check type cua du lieu
    if (isNaN(req.body.entryPrice) || isNaN(req.body.price) || isNaN(req.body.fee) || isNaN(req.body.agencySupport) || isNaN(req.body.feeIfFalse)) {
        res.json({
            error: true,
            message: 'vui long nhap lai'
        })
    } else {
        //get idUser from token
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'dung891995');
        console.log('idUser',idUser);
        // get dataUser from idUser
        let dataUser = await UserModel.findById(idUser.id);

        //get idAgency from nameAgency
        let dataAgency = await AgencyService.findbyName(req.body.name);
        console.log('dataAgency',dataAgency);
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

//giao truc tiep
router.post('/giaotructiep', async function (req, res, next) {


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
            'giaotructiep'
        )
        res.json(dataCart)
    }

})

router.put('/changestatus/:id', async function (req, res, next) {
    CartService.updateStatusCart(req.params.id).then((result) => {

        res.json(result)
    }).catch((err) => {

    });
})

router.get("/:npage", function (req, res, next) {
    var npage = req.params.npage;
    CartService.page(npage).then((result) => {
        res.json(result)
    })
})


router.put('/buttonfalse/:id', function (req, res, next) {
    CartService.buttonFalse(req.params.id).then((result) => {
        res.json(result)
    }).catch((err) => {

    });
})



module.exports = router