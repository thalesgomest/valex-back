import { Request, Response } from "express";

import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

import { TransactionTypes } from "../types/transactionTypes.js";
import { Company } from "../interfaces/companyInterface.js";

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
