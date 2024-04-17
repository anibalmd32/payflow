import { ModuleService } from "../../def";
import { User, UserFilterParasm } from './users.def'
import { dbClient } from "../../utils/contants";
import { encryptPassword } from "../../utils/encryptingPassword";

class UsersService implements ModuleService<User> {
	private reposotory: typeof dbClient.user

	constructor(usersRespository: typeof dbClient.user) {
		this. reposotory = usersRespository
	}

	async createItem(item: User): Promise<User> {
		const newUser = await this.reposotory.create({
			data: {
				...item,
				password: await encryptPassword(item.password)
			}
		})

		return newUser
	}

	async getItem(id: number): Promise<User | null> {
		const user = await this.reposotory.findUnique({ where: { id } })
		
		return user
	}

	async getItems(): Promise<User[]> {
		const users = await this.reposotory.findMany()

		return users
	}

	async getFilteredItems(params: UserFilterParasm): Promise<User[]> {
		const users = await this.reposotory.findMany({ where: params })

		return users
	}

	async updateItem(id: number, item: Partial<User>): Promise<User> {
		if(item.password) item.password = await encryptPassword(item.password)

		const updatedUser = await this.reposotory.update({
			where: { id },
			data: item
		})

		return updatedUser
	}

	async deleteItem(id: number): Promise<void> {
		await this.reposotory.delete({ where: { id }})
	}
}

export default UsersService
