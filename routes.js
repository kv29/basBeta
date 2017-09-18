var express = require('express')
var config = require(__dirname + '/config')
var appDir = config.appDir
var router = express.Router()
, user = require(__dirname+'/app/controllers/user')
router.post('/api/v1/user',user.create)

module.exports = router

