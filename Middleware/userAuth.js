var jwt = require("jsonwebtoken");
module.exports = {
    authToken(req,res,next){
        var token = req.cookies.token;
        if (token) {
          var jwtDecode = jwt.verify(token, 'dung891995');
          console.log(jwtDecode);
          if (jwtDecode && jwtDecode.role == 'admin') {
            return res.next();
          }
          return res.json('ban ko phai admin')
        }
        return res.json('ban chua dang nhap')
    }
}