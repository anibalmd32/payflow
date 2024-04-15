import { Router, Request, Response } from "express"

export type NodeEnv = 'prod' | 'dev' | string

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
	createItem(request: Request, response: Response): Promise<void>
	getItems(request: Request, response: Response): Promise<void>
	getFilteredItems(request: Request, response: Response): Promise<void>
	getItem(request: Request, response: Response): Promise<void>
	updateItem(request: Request, response: Response): Promise<void>
	deleteItem(request: Request, response: Response): Promise<void>
}

export interface ModuleRouter {
	getRouter(): Router
}
