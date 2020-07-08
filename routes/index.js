var express = require('express');
var router = express.Router();
const UserModel = require('../Models/userModel');
const agencyService = require('../Services/agencyService');
const cartService = require('../Services/cartService')
var jwt = require('jsonwebtoken');
const DATA_PER_PAGE = 10;
/* GET home page. */
router.get('/', async function (req, res, next) {

  var getAllAgency = await agencyService.getALlAgency();
  res.render('index', { getAllAgency: getAllAgency });
});

router.get('/login', function (req, res, next) {
  res.render('login')
})
router.get('/homeuser', async function (req, res, next) {
  var getAllCart = await cartService.getAllCart().populate("idUser").populate("idAgency");
  res.render('homeUser', { getAllCart: getAllCart })
})
router.get('/home-admin', async function (req, res, next) {
  var cart_data = await cartService.getAllCart();
  var totalPageLink = Math.ceil(cart_data.length / DATA_PER_PAGE);
  var page_data =await cartService.pageCart(1, DATA_PER_PAGE);
  console.log(page_data.length);
  res.render('homeadmin', { totalPageLink: totalPageLink, page_data:page_data, cart_data:cart_data })
})
router.get('/page-user', function (req, res, next) {
  res.render('quanliuser')
})
router.get('/page-daili', function (req, res, next) {
  res.render('quanlidaili')
})

router.post('/signup', function (req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var commissionUser = req.body.commissionUser
  UserModel.create({
    name: name,
    email: email,
    password: password,
    commissionUser: commissionUser
  }).then((result) => {
    res.json(result)
  }).catch((err) => {
  });
})

router.post('/login', function (req, res,next) {
  var data = req.body;
  UserModel.findOne({
    email: data.email,
    password: data.password

  }).then((result) => {

    if (result) {
      var token = jwt.sign({ role:result.role, id:result.id,name:result.name }, 'dung891995');
      res.cookie("token",token,{maxAge:1000*60*60*24})
      if (result.role == 'admin') {
        return res.redirect("/home-admin")
      } else {
        return res.redirect("/homeuser")
      }
    } else {
      return res.json({
        err: true,
        message: "sai tai khoan or mat khau"
      })
    }
  }).catch((err) => {
    res.json('err' + err)
  });
})

module.exports = router;
