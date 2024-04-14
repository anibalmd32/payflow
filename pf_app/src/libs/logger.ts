import { serverConfig } from "../utils/contants"
import { app } from "../app"
import swaggerDocs from "../swagger"

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