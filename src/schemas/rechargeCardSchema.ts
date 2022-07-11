import joi from "joi";

const rechargeCardSchema = joi.object({
	amount: joi.number().positive().greater(0).required(),
});

export default rechargeCardSchema;
