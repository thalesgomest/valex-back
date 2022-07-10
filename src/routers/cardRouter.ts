import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardRequestSchema from "../schemas/cardRequestSchema.js";
import activationCardSchema from "../schemas/activationCardSchema.js";

const cardRouter = Router();

const endpoint = "/card";
const header = "x-api-key";

cardRouter.post(
	"/create",
	headerMiddleware(header, endpoint),
	validateSchemaMiddleware(cardRequestSchema, `${endpoint}/create`),
	cardController.createCard
);

cardRouter.put(
	"/:cardId/activate",
	validateSchemaMiddleware(
		activationCardSchema,
		`${endpoint}/:cardId/activate`
	),
	cardController.activateCard
);

export default cardRouter;
