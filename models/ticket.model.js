const { Schema, model } = require("mongoose");

const ticketSchema = new Schema({
  event_id: { type: Schema.Types.ObjectId, ref: "Event" },
  seat_id: { type: Schema.Types.ObjectId, ref: "Seat" },
  price: { type: Number, required: true },
  service_fee: { type: Number, default: 0 },
  status_id: { type: Schema.Types.ObjectId, ref: "TicketStatus" },
  ticket_type_id: { type: Schema.Types.ObjectId, ref: "TicketType" }
});

const Ticket = model("Ticket", ticketSchema);

module.exports = { Ticket };
