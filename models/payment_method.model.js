const { Schema, model } = require("mongoose");

const payment_methodSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

const PaymentMethod = model("PaymentMethod", payment_methodSchema);

module.exports = { PaymentMethod };
