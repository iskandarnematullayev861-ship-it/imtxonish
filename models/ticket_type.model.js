const { Schema, model } = require("mongoose");

const ticket_typeSchema = new Schema({
  ticket_type: { type: String, required: true, trim: true }
});

const TicketType = model("TicketType", ticket_typeSchema);

module.exports = { TicketType };
