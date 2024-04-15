import { Router } from "express";
import { ISubsRouter } from "./subs.def";
import SubsController from "./subs.controller";

class SubsRouter implements ISubsRouter {
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

	init(): void {
		this.router.post(`${this.baseUrl}/create`, this.controller.createSubscription.bind(this.controller))
		this.router.get(`${this.baseUrl}/get`, this.controller.getSubscriptions.bind(this.controller))
		this.router.get(`${this.baseUrl}/filtered`, this.controller.getFilteredSubscriptions.bind(this.controller))
		this.router.get(`${this.baseUrl}/get/:id`, this.controller.getSubscription.bind(this.controller))
		this.router.put(`${this.baseUrl}/update/:id`, this.controller.updateSubscription.bind(this.controller))
		this.router.delete(`${this.baseUrl}/delete/:id`, this.controller.deleteSubscription.bind(this.controller))
	}

	public getRoutes(): Router {
		return this.router
	}
}

export default SubsRouter
