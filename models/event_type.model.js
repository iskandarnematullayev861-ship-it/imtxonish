const { Schema, model } = require("mongoose");

const event_typeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  parent_event_type_id: { type: Schema.Types.ObjectId, ref: "EventType" }
});

const EventType = model("EventType", event_typeSchema);

module.exports = { EventType };
