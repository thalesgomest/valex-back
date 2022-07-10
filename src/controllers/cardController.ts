import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

import AppError from "../config/error.js";

export const createCard = async (req: Request, res: Response) => {
	const companyAPIKey = res.locals.header;
	const { employeeId, cardType } = res.locals.body;
	await cardService.createCard(employeeId, cardType, companyAPIKey);

	res.sendStatus(200);
};

export const activateCard = async (req: Request, res: Response) => {
	const cardId = Number(req.params.cardId);
	console.log(cardId);
	if (!cardId) {
		throw new AppError(
			"Card ID is required with route parameter: card/cardId/activate",
			400,
			"Card ID is required and must be a number",
			"Ensure to provide the correct Card ID"
		);
	}
	const { securityCode, password } = res.locals.body;
	await cardService.activateCard(cardId, securityCode, password);

	res.sendStatus(200);
};
