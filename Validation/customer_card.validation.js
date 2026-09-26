const Joi = require("joi");

const customerCardValidationSchema = Joi.object({
  customer_id: Joi.string().required(),
  name: Joi.string().required(),
  phone: Joi.string().pattern(/^\+998\d{9}$/).allow("").optional(),
  number: Joi.string().required(),
  year: Joi.string().required(),
  month: Joi.string().required(),
  is_active: Joi.boolean().optional(),
  is_main: Joi.boolean().optional()
});

module.exports = { customerCardValidationSchema };
