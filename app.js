var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var giaotructiepRouter = require('./routes/giaotructiep');
var agencyRouter=require('./routes/agency');
var cartService = require('./Services/cartService');
var cartRouter = require('./routes/cart');

const excel = require('exceljs');
var app = express();



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get("/xuatFile", async function(req,res,next){
  var getAll = await cartService.getAllCart();
let workbook = new excel.Workbook(); //creating workbook
let worksheet = workbook.addWorksheet('Customers'); //creating worksheet
//  WorkSheet Header
worksheet.columns = [
  { header: 'Id', key: '_id', width: 50 },
  { header: 'createdAt', key: 'createdAt', width: 20},
  { header: 'idAgency', key: 'idAgency', width: 20},
  { header: 'Sim', key: 'sim', width: 20},
  { header: 'entryPrice', key: 'entryPrice', width: 20},
  { header: 'price', key: 'price', width: 20},
  { header: 'fee', key: 'fee', width: 20},
  { header: 'agencySupport', key: 'agencySupport', width: 20},
  { header: 'feeIfFalse', key: 'feeIfFalse', width: 20},
  { header: 'Status', key: 'status', width: 20}, 
];
// Add Array Rows
  worksheet.addRows(getAll);
// Write to File
  workbook.xlsx.writeFile("customer.xlsx").then(function() {
    return res.download("./customer.xlsx");
  }).catch(function(err){
   return res.json({
     error:true,
     message:"lỗi khi tạo excel"
   })
  });
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/giaotructiep',giaotructiepRouter);
app.use('/agency', agencyRouter);
app.use('/cart',cartRouter)

app.get('/choosecart',function (req,res,next) {
  res.render('chooseCart')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
