const { Schema, model } = require("mongoose");

const venue_typesSchema = new Schema({
  venueId: { type: Schema.Types.ObjectId, ref: "Venue" },
  typeId: { type: Schema.Types.ObjectId, ref: "Types" }
});

const VenueTypes = model("VenueTypes", venue_typesSchema);

module.exports = { VenueTypes };
