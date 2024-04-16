import { Router, Request, Response } from "express"

// * NODE ENVIRONMENT
export type NodeEnv = 'prod' | 'dev' | string

// * CUSTOM ROUTER CALLBOACK OBJECTS
export interface AppRequest extends Request {
	user: {
		id: number,
	}
}

export interface AppResponse extends Response {
	success(data: any, module: string): Response
	error(err: any): Response
}

// * FILTERS
export interface FilterParams {
	id?: number
	filter?: string
	page?: number
	limit?: number
}

// MODULE OBJECTS
export interface ModuleService<T> {
	createItem(item: T): Promise<T>
	getItems(): Promise<T[]>
	getFilteredItems(params: FilterParams): Promise<T[]>
	getItem(id: number): Promise<T | null>
	updateItem(id: number, item: Partial<T>): Promise<T>
	deleteItem(id: number): Promise<void>
}

export interface ModuleController {
	createItem(request: AppRequest, response: AppResponse): Promise<void>
	getItems(request: AppRequest, response: AppResponse): Promise<void>
	getFilteredItems(request: AppRequest, response: AppResponse): Promise<void>
	getItem(request: AppRequest, response: AppResponse): Promise<void>
	updateItem(request: AppRequest, response: AppResponse): Promise<void>
	deleteItem(request: AppRequest, response: AppResponse): Promise<void>
}

export interface ModuleRouter {
	getRouter(): Router
}
