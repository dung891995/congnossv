var express = require('express');
var AgencyService = require('../Services/agencyService');
var router = express.Router();

router.get('/',function (req, res, next) {
    AgencyService.getALlAgency().then((result) => {
        res.json(result)
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
router.put("/update/:id",function(req,res,next){
    var data = req.body
    AgencyService.updateAgency(
        req.params.id,
        data.debit,
        data.credit,
        data.name,
        data.commissionAgency
    ).then(function(data){
        res.json(data)
    })
})
router.get("/totalPageLinkAgency", function (req, res, next) {
    var dataPerPage = 12;
    AgencyService.getALlAgency().then(function (data) {
        var totalPageLink = Math.ceil(data.length / dataPerPage);
        res.json(totalPageLink)
    })
  })
  router.get("/pageAgency/:currentPage", function (req, res, next) {
    var currentPage = req.params.currentPage;
    var dataPerPage = 12;
    AgencyService.page(currentPage, dataPerPage).then(function (data) {
        // var dataPerPage = 5;
        res.json(data)
    })
  })

module.exports = router