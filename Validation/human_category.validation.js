const Joi = require("joi");

const humanCategoryValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  start_age: Joi.number().optional(),
  finish_age: Joi.number().optional(),
  gender_id: Joi.string().optional()
});

module.exports = { humanCategoryValidationSchema };
