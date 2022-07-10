import { faker } from "@faker-js/faker";

import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

import { TransactionTypes } from "../types/transactionTypes.js";
import { CardInsertData } from "../types/cardTypes.js";

import { getCardExperationDate } from "../utils/cardDateFormatter.js";
import { encryptData } from "../utils/encryptData.js";

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

const createCardExpirationDate = () => {
	const EXPIRATION_CARD_DATE_YEARS = 5;
	return getCardExperationDate(new Date(), EXPIRATION_CARD_DATE_YEARS);
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
		isBlocked: false,
		type,
	};
};
