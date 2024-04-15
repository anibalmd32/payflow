import { PrismaClient } from "@prisma/client"
import { NodeEnv } from "../def"

const serverConfig = {
	protocol: process.env.PROTOCOL ?? 'http',
	hostname: process.env.HOSTNAME ?? 'localhost',
	port: process.env.PORT ?? 8080
}
const dbClient = new PrismaClient()
const env: NodeEnv = process.env.NODE_DEV ?? 'dev'
const secret = process.env.SECRET ?? 'secret'
const salt = Number(process.env.SALT) ?? 10

export {
	serverConfig,
	dbClient,
	env,
	secret,
	salt
}
