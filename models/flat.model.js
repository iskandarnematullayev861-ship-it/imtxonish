const { Schema, model } = require("mongoose");

const flatSchema = new Schema({
  etaj: { type: Number },
  condition: { type: String, default: "" }
});

const Flat = model("Flat", flatSchema);

module.exports = { Flat };
