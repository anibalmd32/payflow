import UsersService from "./user.service";
import UsersController from "./users.controller";
import UsersRouter from "./users.router";
import { dbClient } from "../../utils/contants";

const service = new UsersService(dbClient.user)
const controller = new UsersController(service)
const usersModule = new UsersRouter(controller).getRouter()

export default usersModule
