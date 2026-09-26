const Joi = require("joi");

const adminValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  login: Joi.string().required().trim().min(3).max(30),
  hashed_password: Joi.string().required().min(6),
  is_active: Joi.boolean().optional(),
  is_creator: Joi.boolean().optional(),
  hashed_refresh_token: Joi.string().allow("").optional()
});

module.exports = { adminValidationSchema };
