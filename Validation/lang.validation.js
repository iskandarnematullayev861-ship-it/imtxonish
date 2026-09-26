const Joi = require("joi");

const langValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { langValidationSchema };
