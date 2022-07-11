import { Request, Response } from "express";

import * as rechargeService from "../services/rechargeService.js";

import AppError from "../config/error.js";

export const rechargeCard = async (req: Request, res: Response) => {
	const cardId = Number(req.params.cardId);
	if (!cardId) {
		throw new AppError(
			"Card ID is required with route parameter: card/cardId/recharge",
			400,
			"Card ID is required and must be a number",
			"Ensure to provide the correct Card ID"
		);
	}
	const companyAPIKey = res.locals.header;
	const { amount } = res.locals.body;
	await rechargeService.validateCardRecharge(cardId, companyAPIKey);
	await rechargeService.rechargeCardDataPersistence(cardId, amount);
	res.sendStatus(200);
};
