const { Schema, model } = require("mongoose");

const human_categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  start_age: { type: Number },
  finish_age: { type: Number },
  gender_id: { type: Schema.Types.ObjectId, ref: "Gender" }
});

const HumanCategory = model("HumanCategory", human_categorySchema);

module.exports = { HumanCategory };
