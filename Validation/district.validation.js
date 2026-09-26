const Joi = require("joi");

const districtValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  region_id: Joi.string().required()
});

module.exports = { districtValidationSchema };
