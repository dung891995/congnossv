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