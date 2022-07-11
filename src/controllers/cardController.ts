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

export const blockCard = async (req: Request, res: Response) => {
	const cardId = Number(req.params.cardId);
	if (!cardId) {
		throw new AppError(
			"Card ID is required with route parameter: card/cardId/block",
			400,
			"Card ID is required and must be a number",
			"Ensure to provide the correct Card ID"
		);
	}
	const { password } = res.locals.body;
	await cardService.blockCard(cardId, password);
	res.sendStatus(200);
};

export const unblockCard = async (req: Request, res: Response) => {
	const cardId = Number(req.params.cardId);
	if (!cardId) {
		throw new AppError(
			"Card ID is required with route parameter: card/cardId/unblock",
			400,
			"Card ID is required and must be a number",
			"Ensure to provide the correct Card ID"
		);
	}
	const { password } = res.locals.body;
	await cardService.unblockCard(cardId, password);
	res.sendStatus(200);
};

export const getStatementCard = async (req: Request, res: Response) => {
	const cardId = Number(req.params.cardId);
	if (!cardId) {
		throw new AppError(
			"Card ID is required with route parameter: card/cardId/statement",
			400,
			"Card ID is required and must be a number",
			"Ensure to provide the correct Card ID"
		);
	}
	const cardStatement = await cardService.getStatementCard(cardId);
	res.status(200).send(cardStatement);
};
