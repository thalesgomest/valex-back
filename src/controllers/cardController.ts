import { Request, Response } from "express";

import * as cardService from "../services/cardService.js";

export const createCard = async (req: Request, res: Response) => {
	const companyAPIKey = res.locals.header;
	const { employeeId, cardType } = res.locals.body;
	const company = await cardService.newCardQueries(
		employeeId,
		cardType,
		companyAPIKey
	);
	console.log(company);
	res.sendStatus(200);
};
