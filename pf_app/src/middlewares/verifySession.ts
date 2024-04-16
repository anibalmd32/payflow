import { NextFunction } from 'express'
import { dbClient } from '../utils/contants'
import { verifyToken } from '../utils/generateSessionToken'
import { AppRequest, AppResponse } from '../def'

const verifySession = async (req: AppRequest, res: AppResponse, next: NextFunction) => {
	try {
		const userSessionToken = req.headers['authorization']
		const token = userSessionToken?.split(' ')[1]
	
		if (!token) throw new Error('session token not provide')
	
		const decoded = verifyToken(token) as { id: number }
		const userInDB = await dbClient.user.findUnique({ where: { id: decoded.id } })

		if (!userInDB) throw new Error('User not found')

		req.user = userInDB
		next()
	} catch (error: any) {
		res.status(403).json({ error: error.message })
	}
}

export default verifySession
