const { Types } = require("../models/types.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postTypes = async (req, res) => {
  try {
    const data = req.body;
    const newTypes = new Types(data);
    await newTypes.save();

    return res.status(201).json({
      success: true,
      message: "Types muvaffaqiyatli yaratildi.",
      data: newTypes,
    });
  } catch (error) {
    console.error("Error creating Types:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search types--------------------
const searchTypes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Types.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday tur topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ message: "Server error: Failed to fetch types." });
  }
};

// --------------- Get All ---------------
const getTypesList = async (req, res) => {
  try {
    const items = await Types.find();
    res.status(200).json({
      success: true,
      message: "Barcha typeslar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching TypesList:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateTypes = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Types.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Types topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Types muvaffaqiyatli yangilandi",
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
const deleteTypes = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Types.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Types topilmadi" });
    }

    res.status(200).json({ message: "Types deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Types:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getTypesById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Types.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Types topilmadi" });
    }

    res.status(200).json({ message: "Types found", data: item });
  } catch (error) {
    console.error("Error getting Types by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postTypes,
  searchTypes,
  getTypesList,
  updateTypes,
  deleteTypes,
  getTypesById,
};
