const Joi = require("joi");

const customerValidationSchema = Joi.object({
  first_name: Joi.string().required().trim(),
  last_name: Joi.string().allow("").optional(),
  phone: Joi.string().pattern(/^\+998\d{9}$/).allow("").optional(),
  hashed_password: Joi.string().required().min(6),
  email: Joi.string().email().allow("").optional(),
  birth_date: Joi.string().allow("").optional(),
  gender_id: Joi.string().allow("").optional(),
  lang_id: Joi.string().allow("").optional(),
  hashed_refresh_token: Joi.string().allow("").optional()
});

module.exports = { customerValidationSchema };
