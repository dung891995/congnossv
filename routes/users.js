var express = require('express');
const UserModel = require('../Models/userModel');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 router


module.exports = router;
