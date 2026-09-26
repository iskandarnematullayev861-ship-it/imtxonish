const Joi = require("joi");

const sectorValidationSchema = Joi.object({
  sector_name: Joi.string().required().trim()
});

module.exports = { sectorValidationSchema };
