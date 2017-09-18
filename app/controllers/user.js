var CWModel = require('cw-models')
, Q = require('q')
, _ = require('lodash')
, config = require(__dirname + '/../../config')
, appDir = config.config.appDir
, userModel = require(appDir + 'app/modess/user')


module.exports.connect = function (req, res) {
  var options = utils.fetchOptionsFromHeaders(req)
  , db = options.db.db(req.headers.organisation)
  , logger  = options.logger
  , finalRes = {
        "status" : "failure",
        "message" : "",
        "data" : null
      }

  if(_.isNil(req.body.name)
    || _.isNil(req.body.email)
    || _.isNil(req.body.password)){
    res.send(finalRes)
  }
  var selectionCriteria = {
    name : req.body.name,
    deleted : false,
    email: req.body.email
  }

  , userObj = {
    name : req.body.name,
    email : req.body.email,
    password : req.body.testFormat,
    createdAt : new Date(),
    deleted : false
  }
 
userModel.findOne(selectionCriteria, {},options).then(function(user){
  if(!user){
    userModel.add(userObj,options).then(function (doc) {
       finalRes['message'] = "user sucessfully created"
       finalRes['data'] = doc
        res.send(finalRes)
    },function (err) {
      finalRes['message'] = err
        res.send(finalRes)
    })
  } 
  else{ 
       finalRes['message'] = "user allready created"
       finalRes['data'] = user
       res.send(finalRes)
  }
},function (err) {
  finalRes['message'] = err
        res.send(finalRes)
})
}