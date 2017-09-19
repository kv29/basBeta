module.exports = function(options){
  return function (req, res, next) {
          req.headers.options = options
            next()
        }
 }

