import { serverConfig } from "../utils/contants"

const { protocol, hostname, port } = serverConfig

const serverLogger = {
	devLog: () => console.info(`[DEV] ${protocol}://${hostname}:${port}`),
	prodLog: () => console.info(`[PROD] Server Online`)
}

export {
	serverLogger
}