const { HumanCategory } = require("../models/human_category.model");
const mongoose = require("mongoose");

const populateHumanCategory = (query) => query.populate("gender_id");

// --------------- Post / Create ---------------
const postHumanCategory = async (req, res) => {
  try {
    const data = req.body;
    const newHumanCategory = new HumanCategory(data);
    await newHumanCategory.save();

    const populated = await populateHumanCategory(HumanCategory.findById(newHumanCategory._id));

    return res.status(201).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli yaratildi.",
      data: populated,
    });
  } catch (error) {
    console.error("Error creating HumanCategory:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search human category--------------------
const searchHumanCategory = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await populateHumanCategory(HumanCategory.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    }));

    if (result.length === 0) {
      return res.json({ message: "Bunday toifa topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching human category:", error);
    res.status(500).json({ message: "Server error: Failed to fetch human category." });
  }
};

// --------------- Get All ---------------
const getHumanCategories = async (req, res) => {
  try {
    const items = await populateHumanCategory(HumanCategory.find());
    res.status(200).json({
      success: true,
      message: "Barcha human_categorylar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching HumanCategories:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateHumanCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateHumanCategory(
      HumanCategory.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "HumanCategory topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "HumanCategory muvaffaqiyatli yangilandi",
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
const deleteHumanCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await HumanCategory.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "HumanCategory topilmadi" });
    }

    res.status(200).json({ message: "HumanCategory deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting HumanCategory:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getHumanCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateHumanCategory(HumanCategory.findById(id));

    if (!item) {
      return res.status(404).json({ message: "HumanCategory topilmadi" });
    }

    res.status(200).json({ message: "HumanCategory found", data: item });
  } catch (error) {
    console.error("Error getting HumanCategory by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postHumanCategory,
  searchHumanCategory,
  getHumanCategories,
  updateHumanCategory,
  deleteHumanCategory,
  getHumanCategoryById,
};
