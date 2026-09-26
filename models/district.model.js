const { Schema, model } = require("mongoose");

const districtSchema = new Schema({
  name: { type: String, required: true, trim: true },
  region_id: { type: Schema.Types.ObjectId, ref: "Region" }
});

const District = model("District", districtSchema);

module.exports = { District };
