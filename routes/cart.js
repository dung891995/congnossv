var express = require('express');
var CartService = require('../Services/cartService');
var AgencyService = require('../Services/agencyService');
var UserModel = require('../Models/userModel')
var router = express.Router();
var jwt = require('jsonwebtoken');
const UserService = require('../Services/userService');
const { authToken } = require('../Middleware/userAuth');
const DATA_PER_PAGE = 10;

router.get('/', function (req, res, next) {
    CartService.getAll().populate("idAgency").populate('idUser').then((result) => {
        res.json(result)
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
            'Đại Lý Giao',
            req.body.name,
            idUser.name

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
            'Giao Trực Tiếp',
            req.body.name,
            
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

//phân trang
router.get("/totalPageLinkCart", function (req, res, next) {
    CartService.getAllCart().then(function (data) {
        var totalPageLink = Math.ceil(data.length / DATA_PER_PAGE);
        res.json(totalPageLink)
    })
  })
  // phân trang
router.get("/page/:currentPage", function (req, res, next) {
var currentPage = req.params.currentPage;
CartService.pageCart(currentPage, DATA_PER_PAGE).then(function (data) {
    res.json(data)
})
})
module.exports = router