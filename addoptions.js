var  _ = require("lodash")
    , jwt = require('jwt-simple')

module.exports = function(options){
  return function (req, res, next) {
          req.headers.options = options
console.log("req.hearders>>>>>>>>>>>>>>>>>>")
console.log(req.headers)
          next()
        }
 }
