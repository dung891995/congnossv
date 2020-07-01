var express = require('express');
var router = express.Router();
const UserModel = require('../Models/userModel');
const agencyService = require('../Services/agencyService');
var jwt = require('jsonwebtoken');
var CartService = require("../Services/cartService");
const cartService = require('../Services/cartService');
/* GET home page. */
router.get('/', async function (req, res, next) {

  var getAllAgency = await agencyService.getALlAgency();
  res.render('index', { getAllAgency: getAllAgency });
});

router.get('/login', function (req, res, next) {
  res.render('login')
})
router.get('/showagency',function (req,res,next) {
  res.render('homeUser')
})
router.get('/home-admin',async function (req,res,next) {
  
  var getAllCart = await cartService.getAll();
  console.log(getAllCart,"aaaaâ");
  res.render('homeadmin',{getAllCart:getAllCart})
})
router.get('/page-user',function (req,res,next) {
  res.render('quanliuser')
})
router.get('/page-daili',function (req,res,next) {
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
    commissionUser:commissionUser
  }).then((result) => {
    res.json(result)
  }).catch((err) => {

  });
})

router.post('/login', function (req, res) {
  var data = req.body;
  UserModel.findOne({
    email: data.email,
    password: data.password
  }).then((result) => {
    if (result) {
      console.log(result);
      var token = jwt.sign({ id: result._id, role: result.role}, "dung891995", { expiresIn: '1d' })
      res.cookie("token", token, { maxAge: 1000 * 3600 * 12 });
      return res.json('dang nhap thanh cong')
    }
    return res.json('sai tk or mk')
  }).catch((err) => {
    res.json('err' + err)
  });
})

module.exports = router;
