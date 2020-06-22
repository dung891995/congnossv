var express = require('express');
var CartService = require('../Services/cartService');
var AgencyService = require('../Services/agencyService');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

router.get('/', function (req, res, next) {
    CartService.getAll().populate("idAgency").populate('idUser').then((result) => {
        res.json(result)
    }).catch((err) => {

    });
})
//name,sim,entryPrice,price,commissionAgency,commissionUser,fee,agencySupport
router.post('/', async function (req, res, next) {
    var data = req.body 
    //get idUser from token
    var token = req.cookies.token;
    var idUser = jwt.verify(token, 'dung891995');
    console.log(idUser);
    //get idAgency from nameAgency

    let dataAgency = await AgencyService.findbyName(data.name)
    console.log(dataAgency);
    var commissionAgency= data.commissionAgency/100;
    var commissionUser= data.commissionUser/100
    //add cart
    let dataCart= await CartService.newCart(
        data.sim,
        dataAgency.id,
        idUser.id,
        data.entryPrice,
        data.price,
        commissionAgency,
        commissionUser,
        data.fee,
        data.agencySupport,
        data.feeIfFalse,
        'dailygiao'
    )
    res.json(dataCart)
})
router.put("/:id",function(req,res,next){

})

module.exports = router