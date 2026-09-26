const Joi = require("joi");

const flatValidationSchema = Joi.object({
  etaj: Joi.number().optional(),
  condition: Joi.string().allow("").optional()
});

module.exports = { flatValidationSchema };
