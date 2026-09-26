const { Seat } = require("../models/seat.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postSeat = async (req, res) => {
  try {
    const data = req.body;
    const newSeat = new Seat(data);
    await newSeat.save();

    return res.status(201).json({
      success: true,
      message: "Seat muvaffaqiyatli yaratildi.",
      data: newSeat,
    });
  } catch (error) {
    console.error("Error creating Seat:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search seat--------------------
const searchSeat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
      { location_in_schema: { $regex: query, $options: "i" } },
    ];

    const numQuery = Number(query);
    if (!isNaN(numQuery)) {
      orConditions.push({ row_number: numQuery });
      orConditions.push({ number: numQuery });
    }

    const result = await Seat.find({ $or: orConditions });

    if (result.length === 0) {
      return res.json({ message: "Bunday o'rindiq topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching seat:", error);
    res.status(500).json({ message: "Server error: Failed to fetch seat." });
  }
};

// --------------- Get All ---------------
const getSeats = async (req, res) => {
  try {
    const items = await Seat.find();
    res.status(200).json({
      success: true,
      message: "Barcha seatlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Seats:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Seat.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Seat topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Seat muvaffaqiyatli yangilandi",
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
const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Seat.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Seat topilmadi" });
    }

    res.status(200).json({ message: "Seat deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Seat:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getSeatById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Seat.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Seat topilmadi" });
    }

    res.status(200).json({ message: "Seat found", data: item });
  } catch (error) {
    console.error("Error getting Seat by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postSeat,
  searchSeat,
  getSeats,
  updateSeat,
  deleteSeat,
  getSeatById,
};
