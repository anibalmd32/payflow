// * MODULES
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// * UTILS
import { serverConfig, env } from './utils/contants'

// * LIBS
import { serverLogger } from './libs/logger'

// * APP INSTANCE
const app = express()

// * INITIAL MIDDLEWARES
app.use(cors())
app.use(morgan(env === 'dev' ? 'dev' : 'common'))
app.use(express.static('public'))

// * API ROOT ROUTE
app.get('/api/v1/', (req, res) => {
	res.status(200).end('PayFlow API version 1.0.0')
})

// * SERVER SETUP
app.listen(
	serverConfig,
	env === 'dev'
		? serverLogger.devLog
		: serverLogger.prodLog
)
