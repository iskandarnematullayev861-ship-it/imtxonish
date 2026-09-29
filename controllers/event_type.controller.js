const { EventType } = require("../models/event_type.model");
const mongoose = require("mongoose");

const populateEventType = (query) => query.populate("parent_event_type_id");

// --------------- Post / Create ---------------
const postEventType = async (req, res) => {
  try {
    const data = req.body;
    const newEventType = new EventType(data);
    await newEventType.save();

    return res.status(201).json({
      success: true,
      message: "EventType muvaffaqiyatli yaratildi.",
      data: newEventType,
    });
  } catch (error) {
    console.error("Error creating EventType:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search event type--------------------
const searchEventType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await populateEventType(
      EventType.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
        ],
      })
    );

    if (result.length === 0) {
      return res.json({ message: "Bunday tadbir turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching event type:", error);
    res.status(500).json({ message: "Server error: Failed to fetch event type." });
  }
};

// --------------- Get All ---------------
const getEventTypes = async (req, res) => {
  try {
    const items = await populateEventType(EventType.find());
    res.status(200).json({
      success: true,
      message: "Barcha event_typelar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching EventTypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateEventType(
      EventType.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "EventType topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "EventType muvaffaqiyatli yangilandi",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- Delete ---------------
const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await EventType.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "EventType topilmadi" });
    }

    res.status(200).json({ message: "EventType deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting EventType:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateEventType(EventType.findById(id));

    if (!item) {
      return res.status(404).json({ message: "EventType topilmadi" });
    }

    res.status(200).json({ message: "EventType found", data: item });
  } catch (error) {
    console.error("Error getting EventType by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postEventType,
  searchEventType,
  getEventTypes,
  updateEventType,
  deleteEventType,
  getEventTypeById,
};

