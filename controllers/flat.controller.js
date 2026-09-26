const { Flat } = require("../models/flat.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postFlat = async (req, res) => {
  try {
    const data = req.body;
    const newFlat = new Flat(data);
    await newFlat.save();

    return res.status(201).json({
      success: true,
      message: "Flat muvaffaqiyatli yaratildi.",
      data: newFlat,
    });
  } catch (error) {
    console.error("Error creating Flat:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search flat--------------------
const searchFlat = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
      { condition: { $regex: query, $options: "i" } },
    ];

    const numQuery = Number(query);
    if (!isNaN(numQuery)) {
      orConditions.push({ etaj: numQuery });
    }

    const result = await Flat.find({ $or: orConditions });

    if (result.length === 0) {
      return res.json({ message: "Bunday kvartira topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching flat:", error);
    res.status(500).json({ message: "Server error: Failed to fetch flat." });
  }
};

// --------------- Get All ---------------
const getFlats = async (req, res) => {
  try {
    const items = await Flat.find();
    res.status(200).json({
      success: true,
      message: "Barcha flatlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Flats:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Flat.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Flat topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Flat muvaffaqiyatli yangilandi",
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
const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Flat.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Flat topilmadi" });
    }

    res.status(200).json({ message: "Flat deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Flat:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Flat.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Flat topilmadi" });
    }

    res.status(200).json({ message: "Flat found", data: item });
  } catch (error) {
    console.error("Error getting Flat by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postFlat,
  searchFlat,
  getFlats,
  updateFlat,
  deleteFlat,
  getFlatById,
};
