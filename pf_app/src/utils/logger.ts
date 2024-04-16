import { serverConfig } from "./contants"
import { app } from "../app"
import swaggerDocs from "../middlewares/swagger"

const { protocol, hostname, port } = serverConfig

const serverLogger = {
	devLog: () => {
		console.info(`[DEV] ${protocol}://${hostname}:${port}`)
		swaggerDocs(app)
	},
	prodLog: () => {
		console.info(`[PROD] Server Online`)
		swaggerDocs(app)
	}
}

export {
	serverLogger
}