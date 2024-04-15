import { Request, Response, Router } from 'express'
import { dbClient } from "../../utils/contants";

// * DATA
export interface ISub {
	id: number;
	membershipId: number;
	customerId: number;
	status: string;
	lastPayment: Date | null;
	nextPayment: Date;
	freeTrial: number;
	interval: string;
}

// * SERVICE
export interface IFiltersParams {
	userId: number
	customerId?: number
	name?: string
}

export interface ISubsService {
	createSubscription(subscription: ISub): Promise<ISub>;
	getSubscriptions(): Promise<ISub[]>;
	getFilteredSubscriptions(params: IFiltersParams): Promise<ISub[]>
	getSubscription(id: number): Promise<ISub | null>;
	updateSubscription(id: number, subscription: ISub): Promise<ISub>;
	deleteSubscription(id: number): Promise<void>;
}

// CONTROLLER
export interface ISubsController {
	createSubscription(request: Request, response: Response): Promise<void>;
	getSubscriptions(request: Request, response: Response): Promise<void>;
	getFilteredSubscriptions(request: Request, response: Response): Promise<void>
	getSubscription(request: Request, response: Response): Promise<void>;
	updateSubscription(request: Request, response: Response): Promise<void>;
	deleteSubscription(request: Request, response: Response): Promise<void>;
}

// ROUTER
export interface ISubsRouter {
	init(): void;
	getRoutes(): Router;
}
