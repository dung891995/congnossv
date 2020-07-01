var express = require('express');
const UserModel = require('../Models/userModel');
var router = express.Router();
const UserService = require("../Services/userService");
const userService = require('../Services/userService');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/user',function (req, res, next) {
  UserService.getAllUser().then((result) => {
      res.json(result)
  }).catch((err) => {
      
  });
})
router.get("/totalPageLink", function (req, res, next) {
  var dataPerPage = 4;
  UserService.getAllUser().then(function (data) {
      var totalPageLink = Math.ceil(data.length / dataPerPage);
      res.json(totalPageLink)
  })
})
router.get("/page/:currentPage", function (req, res, next) {
  var currentPage = req.params.currentPage;
  var dataPerPage = 4;
  UserService.page(currentPage, dataPerPage).then(function (data) {
      // var dataPerPage = 5;
      res.json(data)
  })
})
router.put("/:id",function(req,res,next){
  var data = req.body
  UserService.updateUser(
    req.params.id,
    data.quantity,
    data.salary,
    data.name,
    data.email,
    data.password,
    data.commissionUser
  ).then(function(data){
    res.json(data)
  })
})
router.delete("/:id",function(req,res,next){
  userService.deleteUser(req.params.id).then(function(data){
    res.json(data)
  })
})



module.exports = router;
