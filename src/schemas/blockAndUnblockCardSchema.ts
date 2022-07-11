import joi from "joi";

const passwordRegex = /^\d{4}$/;

const blockCardSchema = joi.object({
	password: joi.string().length(4).pattern(passwordRegex).required(),
});

export default blockCardSchema;
