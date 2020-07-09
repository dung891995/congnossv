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
  var getAll = await cartService.getAll();
//   var value = new Uint8Array(getAll);
//   var wb = xlsx.read(value  ,{type:"array",cellDates:true});
// console.log(wb);

// var ws = wb.Sheets[wb.SheetNames[0]];
// console.log(ws);

// var data = xlsx.utils.sheet_to_json(ws);


// var newData = data.map(function(record){
 
//   console.log(record);
  
//   record.Net = record.sale - record.Cost;
//   delete record.sale;
//   delete record.Cost;
//   return record;
// });

// var newWB = xlsx.utils.book_new(); 

// var newWS = xlsx.utils.json_to_sheet(newData);

// xlsx.utils.book_append_sheet(newWB,newWS,"New Data");

// xlsx.writeFile(newWB,"New Data file.xlsx")
let workbook = new excel.Workbook(); //creating workbook
let worksheet = workbook.addWorksheet('Customers'); //creating worksheet

//  WorkSheet Header
worksheet.columns = [
  { header: 'Id', key: '_id', width: 50 },
  { header: 'Status', key: 'status', width: 50 },
  { header: 'Sim', key: 'sim', width: 20},
  { header: 'Age', key: 'age', width: 10, outlineLevel: 1}
];
// Add Array Rows
worksheet.addRows(getAll);

// Write to File
workbook.xlsx.writeFile("customer.xlsx").then(function() {
    console.log("file saved!");
  });
res.json("A")
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
