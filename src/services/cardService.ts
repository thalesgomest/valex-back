import { faker } from "@faker-js/faker";

import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as paymentsRepository from "../repositories/paymentRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

import { TransactionTypes } from "../types/transactionTypes.js";
import { CardServicesTypes } from "../types/cardServicesTypes.js";
import { CardInsertData, CardUpdateData } from "../types/cardTypes.js";

import {
	getCardExperationDate,
	compareDates,
} from "../utils/cardDateFormatter.js";
import { encryptData, decryptData } from "../utils/encryptData.js";

import AppError from "../config/error.js";

export const createCard = async (
	employeeId: number,
	type: TransactionTypes,
	apiKey: string
) => {
	const { id } = await validateAPIKeyCompany(apiKey);
	const { companyId, fullName } = await validateEmployee(employeeId);
	if (companyId !== id) {
		throw new AppError(
			"Employee unauthorized",
			403,
			"Employee does not belong to this company",
			"Ensure to provide the correct employee ID"
		);
	}
	await validateUniqueCardByTypeAndEmployee(type, employeeId);
	const cardData = generateCardData(employeeId, fullName, type);
	await cardRepository.insert(cardData);
};

export const activateCard = async (
	cardId: number,
	securityCode: string,
	password: string
) => {
	await validateCardForActivation(cardId, securityCode);
	const cardDataUpdate: CardUpdateData = {
		isBlocked: false,
		password: encryptData(password),
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const blockCard = async (cardId: number, password: string) => {
	await validateCardForBlockOrUnblock(cardId, password, "blocking");
	const cardDataUpdate: CardUpdateData = {
		isBlocked: true,
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const unblockCard = async (cardId: number, password: string) => {
	await validateCardForBlockOrUnblock(cardId, password, "unblocking");
	const cardDataUpdate: CardUpdateData = {
		isBlocked: false,
	};
	await cardRepository.update(cardId, cardDataUpdate);
};

export const getStatementCard = async (cardId: number) => {
	const { id } = await validateCardIdIsRegistered(cardId);
	const transactions = await paymentsRepository.findByCardId(id);
	const recharges = await rechargeRepository.findByCardId(id);
	const { balance } = await cardRepository.getStatementBalanceByCardId(id);
	return { balance, transactions, recharges };
};

const validateAPIKeyCompany = async (apiKey: string) => {
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

const validateEmployee = async (employeeId: number) => {
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

const validateUniqueCardByTypeAndEmployee = async (
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

const createCardNumber = () => {
	return faker.finance.creditCardNumber("#### #### #### #### #### ####");
};

const createCardSecurityCode = () => {
	return faker.finance.creditCardCVV();
};

const createCardExpirationDate = () => {
	const EXPIRATION_CARD_DATE_YEARS = 5;
	return getCardExperationDate(new Date(), EXPIRATION_CARD_DATE_YEARS);
};

const employeeNameFormatter = (fullName: string) => {
	const regex = /^(d[a,e,o,i])$/;
	const names = fullName.split(" ");
	let formattedName = "";

	if (names.length === 1) {
		formattedName = names[0];
	} else if (names.length === 2) {
		formattedName = `${names[0]} ${names[1]}`;
	} else {
		const half = Math.floor(names.length / 2);
		const firstName = names[0];
		const lastName = names[names.length - 1];
		const middleName = regex.test(names[half])
			? names[half + 1] === lastName
				? names[half - 1]
				: names[half + 1]
			: names[half];

		formattedName = `${firstName} ${middleName[0]} ${lastName}`;
	}

	return formattedName.toUpperCase();
};

const generateCardData = (
	employeeId: number,
	fullName: string,
	type: TransactionTypes
): CardInsertData => {
	const cardNumber = createCardNumber();
	const cardholderName = employeeNameFormatter(fullName);
	const expirationDate = createCardExpirationDate();
	const encryptedSecurityCode = encryptData(createCardSecurityCode());
	return {
		number: cardNumber,
		employeeId,
		cardholderName,
		securityCode: encryptedSecurityCode,
		expirationDate,
		isVirtual: false,
		isBlocked: true,
		type,
	};
};

const validateCardIdIsRegistered = async (cardId: number) => {
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

const validateCardExpirationDate = async (expirationDate: string) => {
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

const validateCardForActivation = async (cardId: number, cvv: string) => {
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

const validateCardForBlockOrUnblock = async (
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
