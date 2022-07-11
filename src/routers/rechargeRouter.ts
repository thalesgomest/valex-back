import { Router } from "express";
import validateSchema from "../middlewares/validateSchemaMiddleware.js";
import headerMiddleware from "../middlewares/headerMiddleware.js";
import rechargeCardSchema from "../schemas/rechargeCardSchema.js";
import * as rechargeController from "../controllers/rechargeController.js";

const rechargeRouter = Router();
const header = "x-api-key";
const endpoint = "/card";

rechargeRouter.put(
	"/:cardId/recharge",
	headerMiddleware(header, `${endpoint}/:cardId/recharge`),
	validateSchema(rechargeCardSchema, `${endpoint}/:cardId/recharge`),
	rechargeController.rechargeCard
);

export default rechargeRouter;
