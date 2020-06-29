var express = require('express');
var AgencyService = require('../Services/agencyService');
var router = express.Router();

router.get('/',function (req, res, next) {
    AgencyService.getALlAgency().then((result) => {
        res.json({
            error:false,
            message:"thanh cong"
        })
    }).catch((err) => {
        
    });
})

router.post('/', function (req, res, next) {
    var name = req.body.name;
    var commissionAgency = req.body.commissionAgency
    AgencyService.addAgency(name, commissionAgency).then((result) => {
        res.json(result)
    }).catch((err) => {
    });
})
router.put('/:_id', function (req, res, next) {
    var _id = req.params._id;
    var name = req.body.name;
    var commissionAgency = req.body.commissionAgency
    AgencyService.editAgency(_id, name, commissionAgency).then((result) => {
        res.json(result);
    }).catch((err) => {

    });

})

router.delete('/:id',function (req, res, next) {
    var id = req.params.id;
    AgencyService.deleteAgency(id).then((result) => {
        res.json(result)
    }).catch((err) => {
        
    });
})

module.exports = router