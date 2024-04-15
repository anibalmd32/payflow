import { Request, Response } from 'express'
import SubsService from "./subs.service";
import { ISubsController, IFiltersParams } from "./subs.def";

class SubsController implements ISubsController {
	service: SubsService

	constructor({
		service,

	}: {
		service: SubsService
	}) {
		this.service = service
	}

	async createSubscription(request: Request, response: Response): Promise<void> {
		try {
			const { body } = request
			const newSub = await this.service.createSubscription(body)
			response.status(201).json(newSub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getSubscription(request: Request, response: Response): Promise<void> {
		try {
			const { params } = request
			const sub = await this.service.getSubscription(Number(params.id))
			response.status(200).json(sub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getSubscriptions(request: Request, response: Response): Promise<void> {
		try {
			const subs = await this.service.getSubscriptions()
			response.status(200).json(subs)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getFilteredSubscriptions(request: Request, response: Response): Promise<void> {
		try {
			const { query } = request
			const params: IFiltersParams = {
				userId: Number(query.userId),
				customerId: Number(query.customerId),
				name: String(query.name),
			}

			const subs = await this.service.getFilteredSubscriptions(params)
			response.status(200).json(subs)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async updateSubscription(request: Request, response: Response): Promise<void> {
		try {
			const { params, body } = request
			const sub = await this.service.updateSubscription(Number(params.id), body)
			response.status(200).json(sub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async deleteSubscription(request: Request, response: Response): Promise<void> {
		try {
			const { params } = request
			await this.service.deleteSubscription(Number(params.id))
			response.status(204).send()
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}
}

export default SubsController
