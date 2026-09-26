const { Region } = require("../models/region.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postRegion = async (req, res) => {
  try {
    const data = req.body;
    const newRegion = new Region(data);
    await newRegion.save();

    return res.status(201).json({
      success: true,
      message: "Region muvaffaqiyatli yaratildi.",
      data: newRegion,
    });
  } catch (error) {
    console.error("Error creating Region:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search region--------------------
const searchRegion = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Region.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday viloyat topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching region:", error);
    res.status(500).json({ message: "Server error: Failed to fetch region." });
  }
};

// --------------- Get All ---------------
const getRegions = async (req, res) => {
  try {
    const items = await Region.find();
    res.status(200).json({
      success: true,
      message: "Barcha regionlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Regions:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateRegion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Region.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Region topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Region muvaffaqiyatli yangilandi",
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
const deleteRegion = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Region.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Region topilmadi" });
    }

    res.status(200).json({ message: "Region deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Region:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getRegionById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Region.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Region topilmadi" });
    }

    res.status(200).json({ message: "Region found", data: item });
  } catch (error) {
    console.error("Error getting Region by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postRegion,
  searchRegion,
  getRegions,
  updateRegion,
  deleteRegion,
  getRegionById,
};
