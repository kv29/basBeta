const ObjectId = require('mongodb').ObjectId
var bcrypt = require('bcrypt')
var crypto = require('crypto')
var jwt = require('jwt-simple')
var Q = require('q')
var async = require('async')

var config = require(__dirname + '/../../config')
var appDir = config.appDir

var db = require(appDir + 'config/db').client

var secret = require(appDir + 'config/secret')

var collectionName = 'users'



module.exports.add = function (userObj, options) {
  var q = Q.defer()
  var db = options.db
  var logger = options.logger
  var salt = 10
  // console.log('ehheyere1 ', userObj.email, userObj.password, options)

  if(_.isNil(db)) {
    q.reject("SOMETHING_WENT_WRONG")
    return q.promise
  }
  if (_.isNil(userObj.email) || _.isNil(userObj.password)) {
    q.reject("PARAMETERS_MISSING")
    return q.promise
  }
  else {
    createHashValue(userObj.password, salt).then(function (hash) {
      userObj.password = hash
      db.collection('users').insert(userObj, function (err, user) {
        if (err) {
          q.reject(err)
        }
        logger("creating user information")
        q.resolve(user)
      })
    }, function(err) {
      q.reject(err)
    })
    return q.promise  
  }
  
}


module.exports.findOne = function (selectionCriteria, queryOptions, options) {
  var q = Q.defer()
  var db = options.db
  var logger = options.logger
  if(_.isNil(db)) {
    q.reject("SOMETHING_WENT_WRONG")
    return q.promise
  }
  if(_.isNil(selectionCriteria))
    selectionCriteria = {}

  collectionName = options.collection || collectionName

  db.collection(collectionName).findOne(selectionCriteria, queryOptions, function (err,doc) {
    if(err) { 
      options.error = err
      q.reject("SOMETHING_WENT_WRONG")
      return q.promise
    }
    logger("Retrieving user information")
    q.resolve(doc)
  })
  return q.promise
}




function createHashValue(text,saltFactor) {
  var q = Q.defer()
  bcrypt.genSalt(saltFactor, function(err, salt) {
    if (err) {
      q.reject(err)
      return q.promise
    }
    bcrypt.hash(text, salt, function(err, hash) {
      if (err) 
        q.reject(err)
      else
        q.resolve(hash)
    })
  })
  return q.promise
}
