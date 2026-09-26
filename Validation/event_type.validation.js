const Joi = require("joi");

const eventTypeValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  parent_event_type_id: Joi.string().allow("").optional()
});

module.exports = { eventTypeValidationSchema };
