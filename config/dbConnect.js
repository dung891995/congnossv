// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/congnossv', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Kết nối database thành công");
  // we're connected!
});

module.exports=mongoose