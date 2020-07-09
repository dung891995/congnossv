var express = require('express');
var AgencyService = require('../Services/agencyService');
var router = express.Router();
const {authToken} = require('../Middleware/userAuth');
var alert = require('alert-node');
router.get('/addagency',function (req, res, next) {
    res.render('addagency')
})

router.get('/',function (req, res, next) {
    AgencyService.getALlAgency().then((result) => {
        res.json({
            error:false,
            message:"thanh cong",
            data:result
        })
    }).catch((err) => {
        
    });
})
router.post('/', function (req, res, next) {
    var dataRequest = req.body;
    var name = dataRequest.name;
    var commissionAgency = dataRequest.commissionAgency
    AgencyService.addAgency(name, commissionAgency).then((result) => {
        res.json({
            error: false,
            message:'tao dai ly thanh cong'
        })
        
    }).catch((err) => {
        console.log(err);
    });
})
router.put('/:_id',authToken, function (req, res, next) {
    var _id = req.params._id;
    var name = req.body.name;
    var commissionAgency = req.body.commissionAgency
    AgencyService.editAgency(_id, name, commissionAgency).then((result) => {
        res.json(result);
    }).catch((err) => {

    });

})
router.delete('/:id',authToken,function (req, res, next) {
    var id = req.params.id;
    AgencyService.deleteAgency(id).then((result) => {
        res.json(result)
    }).catch((err) => {
        
    });
})

module.exports = router