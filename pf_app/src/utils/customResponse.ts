import { Response } from "express";
import { AppResponse } from "../def";

const extendedResponse = (res: Response) => {
	const appResponse = res as AppResponse
	appResponse.success = (data: any, module: string) => {
		return appResponse.status(200).json({ module, data })
	}

	return appResponse
}

export default extendedResponse
