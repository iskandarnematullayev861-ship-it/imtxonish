const { Country } = require("../models/country.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postCountry = async (req, res) => {
  try {
    const data = req.body;
    const newCountry = new Country(data);
    await newCountry.save();

    return res.status(201).json({
      success: true,
      message: "Country muvaffaqiyatli yaratildi.",
      data: newCountry,
    });
  } catch (error) {
    console.error("Error creating Country:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search country--------------------
const searchCountry = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Country.find({
      $or: [
        { country_name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday davlat topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching country:", error);
    res.status(500).json({ message: "Server error: Failed to fetch country." });
  }
};

// --------------- Get All ---------------
const getCountries = async (req, res) => {
  try {
    const items = await Country.find();
    res.status(200).json({
      success: true,
      message: "Barcha countrylar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Countries:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Country.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Country topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Country muvaffaqiyatli yangilandi",
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
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Country.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Country topilmadi" });
    }

    res.status(200).json({ message: "Country deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Country:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Country.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Country topilmadi" });
    }

    res.status(200).json({ message: "Country found", data: item });
  } catch (error) {
    console.error("Error getting Country by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postCountry,
  searchCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  getCountryById,
};
