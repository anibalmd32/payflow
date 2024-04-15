import { Router } from "express";
import SubsController from "./subs.controller";
import { ModuleRouter } from "../../def";

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
		this.router.post(`${this.baseUrl}/create`, this.controller.createItem.bind(this.controller))
		this.router.get(`${this.baseUrl}/get`, this.controller.getItems.bind(this.controller))
		this.router.get(`${this.baseUrl}/filtered`, this.controller.getFilteredItems.bind(this.controller))
		this.router.get(`${this.baseUrl}/get/:id`, this.controller.getItem.bind(this.controller))
		this.router.put(`${this.baseUrl}/update/:id`, this.controller.updateItem.bind(this.controller))
		this.router.delete(`${this.baseUrl}/delete/:id`, this.controller.deleteItem.bind(this.controller))
	}

	public getRouter(): Router {
		return this.router
	}
}

export default SubsRouter
