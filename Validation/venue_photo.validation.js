const Joi = require("joi");

const venuePhotoValidationSchema = Joi.object({
  venueId: Joi.string().required(),
  url: Joi.string().required()
});

module.exports = { venuePhotoValidationSchema };
