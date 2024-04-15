import { dbClient } from "../../utils/contants";
import {
	ISub,
	ISubsService,
	IFiltersParams,
} from "../../modules/subs/subs.def";

class SubsService implements ISubsService {
	repository: typeof dbClient.subscription

	constructor({
		repository
	}: {
		repository: typeof dbClient.subscription
	}) {
		this.repository = repository
	}

	async createSubscription(subscription: ISub): Promise<ISub> {
		const newSub = await this.repository.create({ data: subscription })
		return newSub
	}

	async getSubscriptions(): Promise<ISub[]> {
		const subs = await this.repository.findMany()
		return subs
	}

	async getFilteredSubscriptions(params: IFiltersParams): Promise<ISub[]> {
		const subs = await this.repository.findMany({ where: params })
		return subs
	}

	async getSubscription(id: number): Promise<ISub | null> {
		const sub = await this.repository.findUnique({ where: { id } })
		return sub
	}

	async updateSubscription(id: number, subscription: ISub): Promise<ISub> {
		const updatedSub = await this.repository.update({ where: { id }, data: subscription })
		return updatedSub
	}

	async deleteSubscription(id: number): Promise<void> {
		await this.repository.delete({ where: { id } })
	}
}

export default SubsService
