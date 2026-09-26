const Joi = require("joi");

const venueTypesValidationSchema = Joi.object({
  venueId: Joi.string().required(),
  typeId: Joi.string().required()
});

module.exports = { venueTypesValidationSchema };
