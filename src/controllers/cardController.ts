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
	const { number, cardholderName, expirationDate, securityCode, password } =
		res.locals.body;
	await cardService.activateCard(
		number,
		cardholderName,
		expirationDate,
		securityCode,
		password
	);

	res.sendStatus(200);
};

export const blockCard = async (req: Request, res: Response) => {
	const { number, cardholderName, expirationDate, password } =
		res.locals.body;
	await cardService.blockCard(
		number,
		cardholderName,
		expirationDate,
		password
	);
	res.sendStatus(200);
};

export const unblockCard = async (req: Request, res: Response) => {
	const { number, cardholderName, expirationDate, password } =
		res.locals.body;
	await cardService.unblockCard(
		number,
		cardholderName,
		expirationDate,
		password
	);
	res.sendStatus(200);
};

export const getStatementCard = async (req: Request, res: Response) => {
	const { number, cardholderName, expirationDate } = res.locals.body;
	const cardStatement = await cardService.getStatementCard(
		number,
		cardholderName,
		expirationDate
	);
	res.status(200).send(cardStatement);
};
