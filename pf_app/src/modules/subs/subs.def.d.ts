import { FilterParams } from "../../def";

// * DATA
export interface Subscription {
	id: number;
	membershipId: number;
	customerId: number;
	status: string;
	lastPayment: Date | null;
	nextPayment: Date;
	freeTrial: number;
	interval: string;
}

export interface SubsFilter extends FilterParams {
	userId?: number;
	customerId?: number;
	name?: string;
}
