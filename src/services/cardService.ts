import { Request, Response } from "express";

import { TransactionTypes } from "../types/transactionTypes.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";

import { Company } from "../interfaces/companyInterface.js";

import AppError from "../config/error.js";

export const newCardQueries = async (
	employeeId: number,
	type: TransactionTypes,
	apiKey: string
) => {
	const companyResult: Company = await companyRepository.findByApiKey(apiKey);
	if (!companyResult) {
		throw new AppError(
			"Company not found",
			404,
			"Company not found with API key",
			"Ensure to provide the correct API key"
		);
	}
	return companyResult;
};
