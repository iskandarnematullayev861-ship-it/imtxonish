const { Schema, model } = require("mongoose");

const customerSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, default: "", trim: true },
  phone: { type: String, default: "" },
  hashed_password: { type: String, required: true },
  email: { type: String, default: "", trim: true },
  birth_date: { type: String, default: "" },
  gender_id: { type: Schema.Types.ObjectId, ref: "Gender" },
  lang_id: { type: Schema.Types.ObjectId, ref: "Lang" },
  hashed_refresh_token: { type: String, default: "" }
});

const Customer = model("Customer", customerSchema);

module.exports = { Customer };
