import { ModuleRouter } from "../../def";
import { Router, Request, Response } from "express";
import { AppRequest, AppResponse } from "../../def";
import UsersController from "./users.controller";

class UsersRouter implements ModuleRouter {
	private router: Router
	private controller: UsersController
	private baseUrl: string

	constructor(controller: UsersController) {
		this.baseUrl = '/users'
		this.router = Router()
		this.controller = controller
		this.init()
	}
	
	private init(): void {
		this.router.post(
			`${this.baseUrl}/create`,
			(req: Request, res: Response) => this.controller.createItem(req as AppRequest, res as AppResponse)
		)
		this.router.get(
			`${this.baseUrl}/get`,
			(req: Request, res: Response) => this.controller.getItems(req as AppRequest, res as AppResponse)
		)
		this.router.get(
			`${this.baseUrl}/filtered`,
			(req: Request, res: Response) => this.controller.getFilteredItems(req as AppRequest, res as AppResponse)
		)
		this.router.get(
			`${this.baseUrl}/get/:id`,
			(req: Request, res: Response) => this.controller.getItem(req as AppRequest, res as AppResponse)
		)
		this.router.put(
			`${this.baseUrl}/update/:id`,
			(req: Request, res: Response) => this.controller.updateItem(req as AppRequest, res as AppResponse)
		)
		this.router.delete(
			`${this.baseUrl}/delete/:id`,
			(req: Request, res: Response) => this.controller.deleteItem(req as AppRequest, res as AppResponse)
		)
	}
	getRouter(): Router {
		return this.router
	}
}

export default UsersRouter