const { SeatType } = require("../models/seat_type.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postSeatType = async (req, res) => {
  try {
    const data = req.body;
    const newSeatType = new SeatType(data);
    await newSeatType.save();

    return res.status(201).json({
      success: true,
      message: "SeatType muvaffaqiyatli yaratildi.",
      data: newSeatType,
    });
  } catch (error) {
    console.error("Error creating SeatType:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search seat type--------------------
const searchSeatType = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await SeatType.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday joy turi topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching seat type:", error);
    res.status(500).json({ message: "Server error: Failed to fetch seat type." });
  }
};

// --------------- Get All ---------------
const getSeatTypes = async (req, res) => {
  try {
    const items = await SeatType.find();
    res.status(200).json({
      success: true,
      message: "Barcha seat_typelar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching SeatTypes:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateSeatType = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await SeatType.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "SeatType topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "SeatType muvaffaqiyatli yangilandi",
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
const deleteSeatType = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await SeatType.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "SeatType topilmadi" });
    }

    res.status(200).json({ message: "SeatType deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting SeatType:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getSeatTypeById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await SeatType.findById(id);

    if (!item) {
      return res.status(404).json({ message: "SeatType topilmadi" });
    }

    res.status(200).json({ message: "SeatType found", data: item });
  } catch (error) {
    console.error("Error getting SeatType by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postSeatType,
  searchSeatType,
  getSeatTypes,
  updateSeatType,
  deleteSeatType,
  getSeatTypeById,
};
