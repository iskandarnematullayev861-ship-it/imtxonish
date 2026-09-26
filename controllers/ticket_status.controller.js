const { TicketStatus } = require("../models/ticket_status.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postTicketStatus = async (req, res) => {
  try {
    const data = req.body;
    const newTicketStatus = new TicketStatus(data);
    await newTicketStatus.save();

    return res.status(201).json({
      success: true,
      message: "TicketStatus muvaffaqiyatli yaratildi.",
      data: newTicketStatus,
    });
  } catch (error) {
    console.error("Error creating TicketStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search ticket status--------------------
const searchTicketStatus = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await TicketStatus.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday status topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching ticket status:", error);
    res.status(500).json({ message: "Server error: Failed to fetch ticket status." });
  }
};

// --------------- Get All ---------------
const getTicketStatuses = async (req, res) => {
  try {
    const items = await TicketStatus.find();
    res.status(200).json({
      success: true,
      message: "Barcha ticket_statuslar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching TicketStatuses:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await TicketStatus.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "TicketStatus topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "TicketStatus muvaffaqiyatli yangilandi",
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
const deleteTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await TicketStatus.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "TicketStatus topilmadi" });
    }

    res.status(200).json({ message: "TicketStatus deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting TicketStatus:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getTicketStatusById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await TicketStatus.findById(id);

    if (!item) {
      return res.status(404).json({ message: "TicketStatus topilmadi" });
    }

    res.status(200).json({ message: "TicketStatus found", data: item });
  } catch (error) {
    console.error("Error getting TicketStatus by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postTicketStatus,
  searchTicketStatus,
  getTicketStatuses,
  updateTicketStatus,
  deleteTicketStatus,
  getTicketStatusById,
};
