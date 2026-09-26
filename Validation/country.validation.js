const Joi = require("joi");

const countryValidationSchema = Joi.object({
  country_name: Joi.string().required().trim()
});

module.exports = { countryValidationSchema };
