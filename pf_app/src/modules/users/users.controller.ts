import { AppRequest, AppResponse, ModuleController } from "../../def";
import UsersService from "./user.service";
import { User, UserFilterParasm } from "./users.def";

class UsersController implements ModuleController {
	private service: UsersService

	constructor(usersService: UsersService) {
		this.service = usersService
	}

	async createItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const item = request.body as User
			const newUser =  await this.service.createItem(item)
			response.success(newUser, 'users')
		} catch (error) {
			response.error(error)
		}
	}

	async getItems(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const users = await this.service.getItems()
			response.success(users, 'users')
		} catch (error) {
			response.error(error)
		}
	}

	async getFilteredItems(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const params = request.query as UserFilterParasm
			const users = await this.service.getFilteredItems(params)
			response.success(users, 'users')
		} catch (error) {
			response.error(error)
		}
	}

	async getItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { params } = request
			const user = await this.service.getItem(Number(params.id))
			response.success(user, 'users')
		} catch (error) {
			response.error(error)
		}
	}

	async updateItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { params, body } = request
			const user = await this.service.updateItem(Number(params.id), body)
			response.success(user, 'users')
		} catch (error) {
			response.error(error)
		}
	}

	async deleteItem(request: AppRequest, response: AppResponse): Promise<void> {
		try {
			const { params } = request
			await this.service.deleteItem(Number(params.id))
			response.success(null, 'users')
		} catch (error) {
			response.error(error)
		}
	}
}

export default UsersController
