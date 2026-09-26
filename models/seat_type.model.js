const { Schema, model } = require("mongoose");

const seat_typeSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

const SeatType = model("SeatType", seat_typeSchema);

module.exports = { SeatType };
