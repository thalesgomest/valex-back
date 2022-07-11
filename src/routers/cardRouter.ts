import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardRequestSchema from "../schemas/cardRequestSchema.js";
import activationCardSchema from "../schemas/activationCardSchema.js";
import blockAndCardSchema from "../schemas/blockAndUnblockCardSchema.js";

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

cardRouter.put(
	"/:cardId/block",
	validateSchemaMiddleware(blockAndCardSchema, `${endpoint}/:cardId/block`),
	cardController.blockCard
);

cardRouter.put(
	"/:cardId/unblock",
	validateSchemaMiddleware(blockAndCardSchema, `${endpoint}/:cardId/unblock`),
	cardController.unblockCard
);

cardRouter.get("/:cardId/statement", cardController.getStatementCard);

export default cardRouter;
