const { Lang } = require("../models/lang.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postLang = async (req, res) => {
  try {
    const data = req.body;
    const newLang = new Lang(data);
    await newLang.save();

    return res.status(201).json({
      success: true,
      message: "Lang muvaffaqiyatli yaratildi.",
      data: newLang,
    });
  } catch (error) {
    console.error("Error creating Lang:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search lang--------------------
const searchLang = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Lang.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday til topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching lang:", error);
    res.status(500).json({ message: "Server error: Failed to fetch lang." });
  }
};

// --------------- Get All ---------------
const getLangs = async (req, res) => {
  try {
    const items = await Lang.find();
    res.status(200).json({
      success: true,
      message: "Barcha langlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Langs:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateLang = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Lang.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Lang topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lang muvaffaqiyatli yangilandi",
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
const deleteLang = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Lang.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Lang topilmadi" });
    }

    res.status(200).json({ message: "Lang deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Lang:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getLangById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Lang.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Lang topilmadi" });
    }

    res.status(200).json({ message: "Lang found", data: item });
  } catch (error) {
    console.error("Error getting Lang by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postLang,
  searchLang,
  getLangs,
  updateLang,
  deleteLang,
  getLangById,
};
