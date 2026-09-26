const Joi = require("joi");

const seatTypeValidationSchema = Joi.object({
  name: Joi.string().required().trim()
});

module.exports = { seatTypeValidationSchema };
