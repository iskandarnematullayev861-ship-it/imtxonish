const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
  finishedAt: { type: String, default: "" },
  status_id: { type: Schema.Types.ObjectId, ref: "TicketStatus" }
});

const Cart = model("Cart", cartSchema);

module.exports = { Cart };
