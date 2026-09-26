const Joi = require("joi");

const eventValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  photo: Joi.string().allow("").optional(),
  start_date: Joi.string().optional(),
  start_time: Joi.string().optional(),
  finish_date: Joi.string().optional(),
  finish_time: Joi.string().optional(),
  info: Joi.string().allow("").optional(),
  event_type_id: Joi.string().optional(),
  human_category_id: Joi.string().optional(),
  venue_id: Joi.string().optional(),
  lang_id: Joi.string().optional(),
  release_date: Joi.string().optional()
});

module.exports = { eventValidationSchema };
