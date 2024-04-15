import { dbClient } from "../../utils/contants";
import { Subscription, SubsFilter } from "../../modules/subs/subs.def";
import { ModuleService } from "../../def";

class SubsService implements ModuleService<Subscription> {
	repository: typeof dbClient.subscription

	constructor({ repository }: { repository: typeof dbClient.subscription }) {
		this.repository = repository
	}

	async createItem(subscription: Subscription): Promise<Subscription> {
		const newSub = await this.repository.create({ data: subscription })
		return newSub
	}

	async getItems(): Promise<Subscription[]> {
		const subs = await this.repository.findMany()
		return subs
	}

	async getFilteredItems(params: SubsFilter): Promise<Subscription[]> {
		const subs = await this.repository.findMany({ where: params })
		return subs
	}

	async getItem(id: number): Promise<Subscription | null> {
		const sub = await this.repository.findUnique({ where: { id } })
		return sub
	}

	async updateItem(id: number, subscription: Subscription): Promise<Subscription> {
		const updatedSub = await this.repository.update({ where: { id }, data: subscription })
		return updatedSub
	}

	async deleteItem(id: number): Promise<void> {
		await this.repository.delete({ where: { id } })
	}
}

export default SubsService
