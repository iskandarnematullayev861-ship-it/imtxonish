const Joi = require("joi");

const customerAddressValidationSchema = Joi.object({
  customer_id: Joi.string().required(),
  name: Joi.string().required(),
  region_id: Joi.string().required(),
  district_id: Joi.string().required(),
  street: Joi.string().required(),
  house: Joi.string().required(),
  flat_id: Joi.string().allow("").optional(),
  location: Joi.string().allow("").optional(),
  post_index: Joi.string().allow("").optional(),
  info: Joi.string().allow("").optional()
});

module.exports = { customerAddressValidationSchema };
