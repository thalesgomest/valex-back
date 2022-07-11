import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";

import { TransactionTypes } from "../types/transactionTypes.js";
import { CardServicesTypes } from "../types/cardServicesTypes.js";

import { compareDates } from "../utils/cardDateFormatter.js";
import { decryptData } from "../utils/encryptData.js";

import AppError from "../config/error.js";

export const validateAPIKeyCompany = async (apiKey: string) => {
	const result = await companyRepository.findByApiKey(apiKey);
	if (!result) {
		throw new AppError(
			"Company not found",
			404,
			"Company not found with API key",
			"Ensure to provide the correct API key"
		);
	}
	return result;
};

export const validateEmployee = async (employeeId: number) => {
	const result = await employeeRepository.findById(employeeId);
	if (!result) {
		throw new AppError(
			"Employee not found",
			404,
			"Employee not found with ID",
			"Ensure to provide the correct ID"
		);
	}
	return result;
};

export const validateUniqueCardByTypeAndEmployee = async (
	type: TransactionTypes,
	employeeId: number
) => {
	const result = await cardRepository.findByTypeAndEmployeeId(
		type,
		employeeId
	);
	if (result) {
		throw new AppError(
			"Card already exists",
			409,
			"Card already exists for this employee",
			"Ensure to provide a unique card type"
		);
	}
};

export const validateCardIdIsRegistered = async (cardId: number) => {
	const result = await cardRepository.findById(cardId);
	if (!result) {
		throw new AppError(
			"Card not found",
			404,
			"Card not found with ID",
			"Ensure to provide the correct ID"
		);
	}
	return result;
};

export const validateCardExpirationDate = async (expirationDate: string) => {
	if (compareDates(new Date(), expirationDate) === "after") {
		throw new AppError(
			"Card expired",
			409,
			"This card has expired",
			"Ensure to provide a valid card ID"
		);
	}
};

const validateCardSecurityCode = async (
	encryptedSecurityCode: string,
	cvv: string
) => {
	const descryptedSecurityCode = decryptData(encryptedSecurityCode);
	// CONSOLELOG: console.log(descryptedSecurityCode);
	if (descryptedSecurityCode !== cvv) {
		throw new AppError(
			"Invalid security code",
			409,
			"Invalid security code",
			"Ensure to provide a correct security code"
		);
	}
};

export const validateCardForActivation = async (
	cardId: number,
	cvv: string
) => {
	const { expirationDate, securityCode, password } =
		await validateCardIdIsRegistered(cardId);
	await validateCardExpirationDate(expirationDate);
	if (password) {
		throw new AppError(
			"Card already activated",
			409,
			"This card is already activated",
			"Ensure to provide a valid card ID"
		);
	}
	await validateCardSecurityCode(securityCode, cvv);
};

export const validateCardForBlockOrUnblock = async (
	cardId: number,
	password: string,
	cardService: CardServicesTypes
) => {
	const {
		expirationDate,
		isBlocked,
		password: registeredCardPassword,
	} = await validateCardIdIsRegistered(cardId);
	await validateCardExpirationDate(expirationDate);
	if (cardService === "blocking" && isBlocked) {
		throw new AppError(
			"Card already blocked",
			409,
			"This card is already blocked",
			"Ensure to provide a valid card ID"
		);
	}
	if (cardService === "unblocking" && !isBlocked) {
		throw new AppError(
			"Card already unblocked",
			409,
			"This card is already unblocked",
			"Ensure to provide a valid card ID"
		);
	}
	if (password !== decryptData(registeredCardPassword)) {
		throw new AppError(
			"Invalid password",
			409,
			"Invalid password",
			"Ensure to provide a correct password"
		);
	}
};

export const validateCardRecharge = async (cardId: number, apiKey: string) => {
	await validateAPIKeyCompany(apiKey);
	const { expirationDate, password } = await validateCardIdIsRegistered(
		cardId
	);
	await validateCardExpirationDate(expirationDate);
	if (!password) {
		throw new AppError(
			"Card not activated",
			409,
			"This card is not activated",
			"Ensure to provide a valid card ID"
		);
	}
};
