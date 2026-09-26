const { Schema, model } = require("mongoose");

const typesSchema = new Schema({
  name: { type: String, required: true, trim: true }
});

const Types = model("Types", typesSchema);

module.exports = { Types };
