const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  cart_id: { type: Schema.Types.ObjectId, ref: "Cart" },
  finished: { type: String, default: "" },
  payment_method_id: { type: Schema.Types.ObjectId, ref: "PaymentMethod" },
  delivery_method_id: { type: Schema.Types.ObjectId, ref: "DeliveryMethod" },
  discount_id: { type: Schema.Types.ObjectId, ref: "Discount" },
  status_id: { type: Schema.Types.ObjectId, ref: "TicketStatus" }
});

const Booking = model("Booking", bookingSchema);

module.exports = { Booking };
