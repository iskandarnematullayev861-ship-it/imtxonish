const Joi = require("joi");

const seatValidationSchema = Joi.object({
  sector_id: Joi.string().required(),
  row_number: Joi.number().required(),
  number: Joi.number().required(),
  venue_id: Joi.string().required(),
  seat_type_id: Joi.string().required(),
  location_in_schema: Joi.string().allow("").optional()
});

module.exports = { seatValidationSchema };
