const Joi = require("joi");

const ticketStatusValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { ticketStatusValidationSchema };
