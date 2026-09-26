const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  name: { type: String, required: true, trim: true },
  photo: { type: String, default: "" },
  start_date: { type: String, default: "" },
  start_time: { type: String, default: "" },
  finish_date: { type: String, default: "" },
  finish_time: { type: String, default: "" },
  info: { type: String, default: "" },
  event_type_id: { type: Schema.Types.ObjectId, ref: "EventType" },
  human_category_id: { type: Schema.Types.ObjectId, ref: "HumanCategory" },
  venue_id: { type: Schema.Types.ObjectId, ref: "Venue" },
  lang_id: { type: Schema.Types.ObjectId, ref: "Lang" },
  release_date: { type: String, default: "" }
});

const Event = model("Event", eventSchema);

module.exports = { Event };
