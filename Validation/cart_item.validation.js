const Joi = require("joi");

const cartItemValidationSchema = Joi.object({
  ticket_id: Joi.string().required(),
  cart_id: Joi.string().required()
});

module.exports = { cartItemValidationSchema };
