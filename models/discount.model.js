const { Schema, model } = require("mongoose");

const discountSchema = new Schema({
  discount: { type: Number, required: true },
  finish_date: { type: String, default: "" }
});

const Discount = model("Discount", discountSchema);

module.exports = { Discount };
