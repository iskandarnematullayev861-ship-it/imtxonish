const { Gender } = require("../models/gender.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postGender = async (req, res) => {
  try {
    const data = req.body;
    const newGender = new Gender(data);
    await newGender.save();

    return res.status(201).json({
      success: true,
      message: "Gender muvaffaqiyatli yaratildi.",
      data: newGender,
    });
  } catch (error) {
    console.error("Error creating Gender:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search gender--------------------
const searchGender = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Gender.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday jins topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching gender:", error);
    res.status(500).json({ message: "Server error: Failed to fetch gender." });
  }
};

// --------------- Get All ---------------
const getGenders = async (req, res) => {
  try {
    const items = await Gender.find();
    res.status(200).json({
      success: true,
      message: "Barcha genderlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Genders:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateGender = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Gender.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Gender topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Gender muvaffaqiyatli yangilandi",
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
const deleteGender = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Gender.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Gender topilmadi" });
    }

    res.status(200).json({ message: "Gender deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Gender:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getGenderById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Gender.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Gender topilmadi" });
    }

    res.status(200).json({ message: "Gender found", data: item });
  } catch (error) {
    console.error("Error getting Gender by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postGender,
  searchGender,
  getGenders,
  updateGender,
  deleteGender,
  getGenderById,
};
