var express = require('express');
var cartSevice = require('../Services/cartService');
var AgencyService = require('../Services/agencyService');
var jwt = require('jsonwebtoken');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('giaotructiep', { title: 'Express' });
});
router.post('/',async function(req,res,next){
  var data = req.body;
  var token = req.cookies.token;
  var idUser = jwt.verify(token, 'dung891995');
  let dataAgency = await AgencyService.findbyName(data.name);
  var commissionAgency= data.commissionAgency/100;
  var commissionUser= data.commissionUser/100;
  let dataCart= await cartSevice.newCart(
      data.sim,
      dataAgency.id,
      idUser.id,
      data.entryPrice,
      data.price,
      commissionAgency,
      commissionUser,
      data.fee,
      data.agencySupport,
      'giaotructiep'
  )
  res.json(dataCart)
})
router.put('/',function(req,res,next){
  var token = req.cookies.token;
  var decoded = jwt.verify(token, 'dung891995');
  if(decoded.role=="admin"){
    next();
}else{
return res.json("you are not Admin")
}
},function(req,res,next){
  cartSevice.updatecart(req.body.sim,req.body.idAgency,req.body.sim,idUser,req.body.entryPrice,req.body.price,req.body.commissionAgency,req.body.commissionUser,req.body.fee,req.body.agencySupport,req.body.feeIfFalse).then(function(data){
          res.json({
            error:false,
            message:"update success"
          })
  })
})
router.delete('/:id',function(req,res,net){
  cartSevice.deleteOne(req.params.id).then(function(data){
    res.json({
      error:false,
      message:"xoa thanh cong"
    })
  })
})
module.exports = router;
