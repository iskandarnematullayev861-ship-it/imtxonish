const Joi = require("joi");

const paymentMethodValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { paymentMethodValidationSchema };
