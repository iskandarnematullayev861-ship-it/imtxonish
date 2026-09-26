const Joi = require("joi");

const cartValidationSchema = Joi.object({
  customer_id: Joi.string().required(),
  finishedAt: Joi.date().optional(),
  status_id: Joi.string().required()
});

module.exports = { cartValidationSchema };
