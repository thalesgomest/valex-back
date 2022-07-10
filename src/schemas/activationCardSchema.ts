import joi from "joi";

const passwordRegex = /^\d{4}$/;

const activationCardSchema = joi.object({
	securityCode: joi.string().length(3).required(),
	password: joi.string().length(4).pattern(passwordRegex).required(),
});

export default activationCardSchema;
