const { Sector } = require("../models/sector.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postSector = async (req, res) => {
  try {
    const data = req.body;
    const newSector = new Sector(data);
    await newSector.save();

    return res.status(201).json({
      success: true,
      message: "Sector muvaffaqiyatli yaratildi.",
      data: newSector,
    });
  } catch (error) {
    console.error("Error creating Sector:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
    });
  }
};

// --------------------search sector--------------------
const searchSector = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Sector.find({
      $or: [
        { sector_name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday sektor topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching sector:", error);
    res.status(500).json({ message: "Server error: Failed to fetch sector." });
  }
};

// --------------- Get All ---------------
const getSectors = async (req, res) => {
  try {
    const items = await Sector.find();
    res.status(200).json({
      success: true,
      message: "Barcha sectorlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Sectors:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateSector = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Sector.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Sector topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sector muvaffaqiyatli yangilandi",
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
const deleteSector = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Sector.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Sector topilmadi" });
    }

    res.status(200).json({ message: "Sector deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Sector:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getSectorById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Sector.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Sector topilmadi" });
    }

    res.status(200).json({ message: "Sector found", data: item });
  } catch (error) {
    console.error("Error getting Sector by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postSector,
  searchSector,
  getSectors,
  updateSector,
  deleteSector,
  getSectorById,
};
