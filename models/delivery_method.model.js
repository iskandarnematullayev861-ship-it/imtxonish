const { Schema, model } = require("mongoose");

const delivery_methodSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

const DeliveryMethod = model("DeliveryMethod", delivery_methodSchema);

module.exports = { DeliveryMethod };
