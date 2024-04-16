import jwt, {JwtPayload} from 'jsonwebtoken'
import { secret } from './contants'

const generateToken = (data: any) => {
	return jwt.sign(data, secret)
}

const verifyToken = (token: string) => {
	const decoded = jwt.verify(token, secret)
	
	if (!decoded) throw new Error('Not data in token')

	return decoded
}

export { generateToken, verifyToken }
