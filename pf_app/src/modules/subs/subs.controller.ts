import { Request, Response } from 'express'
import SubsService from "./subs.service";
import { ModuleController } from '../../def';
import { SubsFilter } from './subs.def';

class SubsController implements ModuleController {
	service: SubsService

	constructor({ service }: { service: SubsService }) {
		this.service = service
	}

	async createItem(request: Request, response: Response): Promise<void> {
		try {
			const { body } = request
			const newSub = await this.service.createItem(body)
			response.status(201).json(newSub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getItem(request: Request, response: Response): Promise<void> {
		try {
			const { params } = request
			const sub = await this.service.getItem(Number(params.id))
			response.status(200).json(sub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getItems(request: Request, response: Response): Promise<void> {
		try {
			const subs = await this.service.getItems()
			response.status(200).json(subs)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getFilteredItems(request: Request, response: Response): Promise<void> {
		try {
			const { query } = request

			const params: SubsFilter = {
				userId: Number(query.userId),
				customerId: Number(query.customerId),
				name: String(query.name),
			}

			const subs = await this.service.getFilteredItems(params)
			response.status(200).json(subs)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async updateItem(request: Request, response: Response): Promise<void> {
		try {
			const { params, body } = request
			const sub = await this.service.updateItem(Number(params.id), body)
			response.status(200).json(sub)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async deleteItem(request: Request, response: Response): Promise<void> {
		try {
			const { params } = request
			await this.service.deleteItem(Number(params.id))
			response.status(204).send()
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}
}

export default SubsController
