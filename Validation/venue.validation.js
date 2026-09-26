const Joi = require("joi");

const venueValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  address: Joi.string().allow("").optional(),
  location: Joi.string().allow("").optional(),
  site: Joi.string().allow("").optional(),
  phone: Joi.string().pattern(/^\+998\d{9}$/).allow("").optional(),
  schema: Joi.string().allow("").optional(),
  region_id: Joi.string().optional(),
  district_id: Joi.string().optional()
});

module.exports = { venueValidationSchema };
