const { Schema, model } = require("mongoose");

const cart_itemSchema = new Schema({
  ticket_id: { type: Schema.Types.ObjectId, ref: "Ticket" },
  cart_id: { type: Schema.Types.ObjectId, ref: "Cart" }
});

const CartItem = model("CartItem", cart_itemSchema);

module.exports = { CartItem };
