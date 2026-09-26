const Joi = require("joi");

const deliveryMethodValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { deliveryMethodValidationSchema };
