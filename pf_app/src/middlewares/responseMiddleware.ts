import { Request, Response, NextFunction } from 'express'
import extendedResponse from "../utils/customResponse";

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res = extendedResponse(res)
	next()
}

export default responseMiddleware
