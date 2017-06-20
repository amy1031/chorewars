// LOCAL DEV VARIABLES
let env = {
	NODE_ENV: 'development',
	PORT: 3000,
	DBPROTOCOL: 'mongodb',
	DBUSERNAME: 'chorewars2',
	DBPASSWORD: 'chorewars',
	DBHOST: 'ds131512.mlab.com:31512',
	DBNAME: 'chorewars2',
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