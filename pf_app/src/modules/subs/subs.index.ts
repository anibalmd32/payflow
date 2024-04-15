import SubsService from "./subs.service";
import SubsController from "./subs.controller";
import SubsRouter from "./subs.routes";
import { dbClient } from "../../utils/contants";

const service = new SubsService({ repository: dbClient.subscription })
const controller = new SubsController({ service })
const subsModule = new SubsRouter({ controller })

export default subsModule.getRoutes()
