const Joi = require("joi");

const regionValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { regionValidationSchema };
