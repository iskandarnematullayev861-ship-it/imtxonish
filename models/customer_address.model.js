const { Schema, model } = require("mongoose");

const customer_addressSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: "Customer" },
  name: { type: String, required: true },
  region_id: { type: Schema.Types.ObjectId, ref: "Region" },
  district_id: { type: Schema.Types.ObjectId, ref: "District" },
  street: { type: String, required: true },
  house: { type: String, required: true },
  flat_id: { type: Schema.Types.ObjectId, ref: "Flat" },
  location: { type: String, default: "" },
  post_index: { type: String, default: "" },
  info: { type: String, default: "" }
});

const CustomerAddress = model("CustomerAddress", customer_addressSchema);

module.exports = { CustomerAddress };
