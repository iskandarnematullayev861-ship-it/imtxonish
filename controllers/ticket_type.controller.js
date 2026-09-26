const { TicketType } = require("../models/ticket_type.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postTicketType = async (req, res) => {
  try {
    const data = req.body;
    const newTicketType = new TicketType(data);
    await newTicketType.save();

    return res.status(201).json({
      success: true,
      message: "TicketType muvaffaqiyatli yaratildi.",
      data: newTicketType,
    });
  } catch (error) {
    console.error("Error creating TicketType:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search ticket type--------------------
const searchTicketType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await TicketType.find({
      $or: [
        { ticket_type: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday chipta turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching ticket type:", error);
    res.status(500).json({ message: "Server error: Failed to fetch ticket type." });
  }
};

// --------------- Get All ---------------
const getTicketTypes = async (req, res) => {
  try {
    const items = await TicketType.find();
    res.status(200).json({
      success: true,
      message: "Barcha ticket_typelar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching TicketTypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateTicketType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await TicketType.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "TicketType topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "TicketType muvaffaqiyatli yangilandi",
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
const deleteTicketType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await TicketType.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "TicketType topilmadi" });
    }

    res.status(200).json({ message: "TicketType deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting TicketType:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getTicketTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await TicketType.findById(id);

    if (!item) {
      return res.status(404).json({ message: "TicketType topilmadi" });
    }

    res.status(200).json({ message: "TicketType found", data: item });
  } catch (error) {
    console.error("Error getting TicketType by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postTicketType,
  searchTicketType,
  getTicketTypes,
  updateTicketType,
  deleteTicketType,
  getTicketTypeById,
};
