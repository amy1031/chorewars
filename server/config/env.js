// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'production',
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'amycw',
	DBPASSWORD: 'amycw',
	DBHOST: 'ds135912.mlab.com:35912',
	DBNAME: 'chorewarsdb',
	SERVERNAME: 'dev-server'
}
// mongodb://<dbuser>:<dbpassword>@ds131512.mlab.com:31512/chorewars2

// MAPS env TO ACTUAL ENVIRONMENT
Object.keys(env).forEach(v => {
	process.env[v] = process.env[v] || env[v]
})


// MongoDb Connection String Builder
env.CONNECTIONSTRING = `${env.DBPROTOCOL}://${env.DBUSERNAME}:${env.DBPASSWORD}@${env.DBHOST}/${env.DBNAME}`
process.env.CONNECTIONSTRING = env.CONNECTIONSTRING

exports = env