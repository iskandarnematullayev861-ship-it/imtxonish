const { Schema, model } = require("mongoose");

const ticket_statusSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

const TicketStatus = model("TicketStatus", ticket_statusSchema);

module.exports = { TicketStatus };
