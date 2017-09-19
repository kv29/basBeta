const isThere = require('is-there')
    , currentEnv = process.env.NODE_ENV || 'development'
    , envFilePath = __dirname + "/env/" + currentEnv + ".js"

var environmentOptions
  , projectName
if(!isThere(envFilePath))
  console.log("Environment file missing")
else
  environmentOptions = require(envFilePath)
  projectName = environmentOptions.projectName || 'basBeta'

module.exports = {
  port: environmentOptions.server.port,
  serverHost: environmentOptions.server.host + ':' +environmentOptions.server.port,
  databaseUrl: environmentOptions.database.path + environmentOptions.database.name,
  databaseHost: environmentOptions.database.host,
  databasePort: environmentOptions.database.port,
  databaseName: environmentOptions.database.name,
  appDir: __dirname.match(new RegExp("(.*\/("+ projectName +")\/)(.*)$"))[1]
}

