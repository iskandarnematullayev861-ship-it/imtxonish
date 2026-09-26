const { Schema, model } = require("mongoose");

const venueSchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, default: "" },
  location: { type: String, default: "" },
  site: { type: String, default: "" },
  phone: { type: String, default: "" },
  schema: { type: String, default: "" },
  region_id: { type: Schema.Types.ObjectId, ref: "Region" },
  district_id: { type: Schema.Types.ObjectId, ref: "District" }
});

const Venue = model("Venue", venueSchema);

module.exports = { Venue };
