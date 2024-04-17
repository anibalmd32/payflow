import { FilterParams } from "../../def";

// * DATA
export interface User {
	id: number;
	username: string;
	email: string;
	password: string;
}

// * QUERY
export interface UserFilterParasm extends FilterParams {
	username?: string;
	email?: string;
}