const { Schema, model } = require("mongoose");

const venue_photoSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, ref: "Venue" },
  url: { type: String, required: true }
});

const VenuePhoto = model("VenuePhoto", venue_photoSchema);

module.exports = { VenuePhoto };
