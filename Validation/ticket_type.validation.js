const Joi = require("joi");

const ticketTypeValidationSchema = Joi.object({
  ticket_type: Joi.string().required().trim()
});

module.exports = { ticketTypeValidationSchema };
