import jwt, {JwtPayload} from 'jsonwebtoken'
import { secret } from './contants'

const generateToken = (data: any) => {
	return jwt.sign(data, secret)
}

const verifyToken = (token: string) => {
	const decoded = jwt.verify(token, secret) as JwtPayload
	const sub = decoded.sub as { id: number } | undefined

	return sub
}

export { generateToken, verifyToken }
