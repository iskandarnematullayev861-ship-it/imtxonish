const { Event } = require("../models/event.model");
const mongoose = require("mongoose");

const populateEvent = (query) =>
  query
    .populate("event_type_id")
    .populate("human_category_id")
    .populate("venue_id")
    .populate("lang_id");

// --------------- Post / Create ---------------
const postEvent = async (req, res) => {
  try {
    const data = req.body;
    const newEvent = new Event(data);
    await newEvent.save();

    const populated = await populateEvent(Event.findById(newEvent._id));

    return res.status(201).json({
      success: true,
      message: "Event muvaffaqiyatli yaratildi.",
      data: populated,
    });
  } catch (error) {
    console.error("Error creating Event:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search event--------------------
const searchEvent = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await populateEvent(Event.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { info: { $regex: query, $options: "i" } },
        { start_date: { $regex: query, $options: "i" } },
        { finish_date: { $regex: query, $options: "i" } },
      ],
    }));

    if (result.length === 0) {
      return res.json({ message: "Bunday tadbir topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Server error: Failed to fetch event." });
  }
};

// --------------- Get All ---------------
const getEvents = async (req, res) => {
  try {
    const items = await populateEvent(Event.find());
    res.status(200).json({
      success: true,
      message: "Barcha eventlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Events:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateEvent(
      Event.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Event topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event muvaffaqiyatli yangilandi",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// --------------- Delete ---------------
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Event.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Event topilmadi" });
    }

    res.status(200).json({ message: "Event deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Event:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateEvent(Event.findById(id));

    if (!item) {
      return res.status(404).json({ message: "Event topilmadi" });
    }

    res.status(200).json({ message: "Event found", data: item });
  } catch (error) {
    console.error("Error getting Event by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postEvent,
  searchEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventById,
};
