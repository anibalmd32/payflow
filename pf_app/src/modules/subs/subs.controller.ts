import { AppRequest, AppResponse } from "../../def";
import SubsService from "./subs.service";
import { ModuleController } from '../../def';
import { SubsFilter } from './subs.def';

class SubsController implements ModuleController {
	service: SubsService
	module = 'subscriptions'

	constructor({ service }: { service: SubsService }) {
		this.service = service
	}

	async createItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { body } = request
			const newSub = await this.service.createItem(body)
			response.success(newSub, this.module)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { params } = request
			const sub = await this.service.getItem(Number(params.id))
			response.success(sub, this.module)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getItems(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const subs = await this.service.getItems()
			response.success(subs, this.module)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async getFilteredItems(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { query } = request

			const params: SubsFilter = {
				userId: Number(query.userId),
				customerId: Number(query.customerId),
				name: String(query.name),
			}

			const subs = await this.service.getFilteredItems(params)
			response.success(subs, this.module)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async updateItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { params, body } = request
			const sub = await this.service.updateItem(Number(params.id), body)
			response.success(sub, this.module)
		} catch (error: any) {
			response.status(400).json({ error: error.message })
		}
	}

	async deleteItem(request: AppRequest, response: AppResponse): Promise<void> {
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
