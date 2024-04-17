import { Router, Request, Response } from "express";
import SubsController from "./subs.controller";
import { ModuleRouter, AppRequest, AppResponse } from "../../def";

class SubsRouter implements ModuleRouter {
	private router: Router
	private controller: SubsController
	private baseUrl: string
	
	constructor({
		controller,
	}: {
		controller: SubsController
	}) {
		this.baseUrl = '/subs'
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

	public getRouter(): Router {
		return this.router
	}
}

export default SubsRouter
