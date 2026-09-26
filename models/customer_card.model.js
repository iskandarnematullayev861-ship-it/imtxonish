const { Schema, model } = require("mongoose");

const customer_cardSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
  name: { type: String, required: true },
  phone: { type: String, default: "" },
  number: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  is_active: { type: Boolean, default: true },
  is_main: { type: Boolean, default: false }
});

const CustomerCard = model("CustomerCard", customer_cardSchema);

module.exports = { CustomerCard };
