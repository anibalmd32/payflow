import { serverConfig } from "../utils/contants"

const { protocol, hostname, port } = serverConfig

const serverListening = () => console.info(`Server running at ${protocol}://${hostname}:${port}`)

export {
	serverListening
}