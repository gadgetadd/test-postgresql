const Joi = require("joi");

const userSchema = Joi.object({
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid("admin", "user").required(),
    state: Joi.string().valid("male", "female").required(),
});

const updateUserSchema = Joi.object({
    username: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string().valid("admin", "user"),
    state: Joi.string().valid("male", "female"),
});

module.exports = { addUserSchema, updateUserSchema };