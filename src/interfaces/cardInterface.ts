import { TransactionTypes } from "../repositories/cardRepository";

interface Card {
	id?: number;
	employeeId: number;
	number: string;
	cardholderName: string;
	securityCode: string;
	expirationDate: string;
	password?: string;
	isVirtual: boolean;
	originalCardId?: number;
	isBlocked: boolean;
	type: TransactionTypes;
}

export default Card;
