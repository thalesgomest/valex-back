import { Router } from "express";
import * as cardController from "../controllers/cardController.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import cardRequestSchema from "../schemas/cardRequestSchema.js";

const cardRouter = Router();

const endpoint = "/card";
const header = "x-api-key";

cardRouter.post(
	"/create",
	headerMiddleware(header, endpoint),
	validateSchemaMiddleware(cardRequestSchema, `${endpoint}/create`),
	cardController.createCard
);

export default cardRouter;
