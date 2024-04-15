// * EXTERNAL MODULES
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// * APP MODULES
import subsModule from './modules/subs/subs.index'

// * UTILS
import { serverConfig, env } from './utils/contants'

// * LIBS
import { serverLogger } from './libs/logger'

// * APP INSTANCE
const app = express()

// * INITIAL MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use(morgan(env === 'dev' ? 'dev' : 'common'))
app.use(express.static('public'))

// * API ROOT ROUTE
app.get('/api/v1/', (req, res) => {
	res.json({ message: 'PayFlow API version 1.0.0' })
})

// * API ROUTES
app.use('/api/v1', subsModule)

// * SERVER SETUP
const server = app.listen(
	serverConfig,
	env === 'dev'
		? serverLogger.devLog
		: serverLogger.prodLog
)

export { app, server }
