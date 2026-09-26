const Joi = require("joi");

const typesValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { typesValidationSchema };
