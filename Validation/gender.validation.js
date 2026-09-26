const Joi = require("joi");

const genderValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { genderValidationSchema };
