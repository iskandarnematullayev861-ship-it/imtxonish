const Joi = require("joi");

const objectId = Joi.string().hex().length(24);

const bookingValidationSchema = Joi.object({
  cart_id: objectId.required(),
  finished: Joi.string().allow("").optional(),
  payment_method_id: objectId.required(),
  delivery_method_id: objectId.required(),
  discount_id: objectId.allow("").optional(),
  status_id: objectId.required(),
  createdAt: Joi.any().optional(),
}).unknown(true);

module.exports = { bookingValidationSchema };
