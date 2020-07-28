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
    let textSearch = req.query.textSearch
    CartService.getAllCart().then((result) => {

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
    CartService.getCartofUser(idUser.id).then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
})

router.post('/getcartbysim', function (req, res, next) {
    var sim = req.body.sim;
    CartService.getCartBySim(sim).populate("idAgency").populate('idUser').then((result) => {
        return res.json(result)
    }).catch((err) => {
        return res.json(err)
    });
})
router.put('/note/:id',function (req, res, next) {
    CartService.saveNote(req.params.id,req.body.note).then((result) => {
        res.json(result.note);
    }).catch((err) => {
        res.json({
            error:true,
            message:'loi o router',err
        })
    });
})
//name,sim,entryPrice,price,commissionAgency,commissionUser,fee,agencySupport
router.post('/', async function (req, res, next) {
    //check type cua du lieu
    // if (isNaN(req.body.entryPrice) || isNaN(req.body.price) || isNaN(req.body.fee) || isNaN(req.body.agencySupport) || isNaN(req.body.feeIfFalse) 
    // || isNaN(req.body.khachHoTro)
    // ) {
        
    //     res.json({
    //         error: true,
    //         message: 'vui long nhap lai'
    //     })
    // } else {
        console.log(req.body.name);
        //get idUser from token
        var token = req.cookies.token;
        var idUser = jwt.verify(token, 'dung891995');
        // get dataUser from idUser
        let dataUser = await UserModel.findById(idUser.id);

        //get idAgency from nameAgency
        let dataAgency = await AgencyService.findbyName(req.body.name);
        
        let dataCart = await CartService.newCart(
            req.body.sim,
            dataAgency._id,
            idUser.id,
            req.body.entryPrice,
            req.body.price,
            req.body.fee,
            req.body.agencySupport,
            req.body.khachHoTro,
            req.body.feeIfFalse,
            'dailygiao',
            req.body.name,
            idUser.name

        )
       return res.json(dataCart)
    // }

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
            'giaotructiep',
            req.body.name,

        )
        res.json(dataCart)
    }

})

router.put('/changestatus/:id', async function (req, res, next) {
    CartService.updateStatusCart(req.params.id).then((result) => {

        res.json(result)
    }).catch((err) => {
        res.json("loi o router",err)
    });
})
router.put('/buttonfalse/:id', function (req, res, next) {
    CartService.buttonFalse(req.params.id).then((result) => {
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
    CartService.pageCart(currentPage, DATA_PER_PAGE).populate("idAgency").populate('idUser').then(function (data) {
        res.json(data)
    })
})


router.put('/buttonfalse/:id', function (req, res, next) {
    CartService.buttonFalse(req.params.id).then((result) => {
        res.json(result)
    }).catch((err) => {

    });
})



module.exports = router