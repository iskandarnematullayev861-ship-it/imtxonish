const Joi = require("joi");

const ticketValidationSchema = Joi.object({
  event_id: Joi.string().required(),
  seat_id: Joi.string().required(),
  price: Joi.number().required(),
  service_fee: Joi.number().optional(),
  status_id: Joi.string().required(),
  ticket_type_id: Joi.string().required()
});

module.exports = { ticketValidationSchema };
