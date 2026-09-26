const { Schema, model } = require("mongoose");

const seatSchema = new Schema({
  sector_id: { type: Schema.Types.ObjectId, ref: "Sector" },
  row_number: { type: Number, required: true },
  number: { type: Number, required: true },
  venue_id: { type: Schema.Types.ObjectId, ref: "Venue" },
  seat_type_id: { type: Schema.Types.ObjectId, ref: "SeatType" },
  location_in_schema: { type: String, default: "" }
});

const Seat = model("Seat", seatSchema);

module.exports = { Seat };
