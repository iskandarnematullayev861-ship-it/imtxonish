const Joi = require("joi");

const discountValidationSchema = Joi.object({
  discount: Joi.number().required(),
  finish_date: Joi.date().optional()
});

module.exports = { discountValidationSchema };
