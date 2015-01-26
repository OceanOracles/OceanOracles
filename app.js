// start app server
console.log(process.env)
require('./server/server.js').listen(process.env.PORT || 8000);