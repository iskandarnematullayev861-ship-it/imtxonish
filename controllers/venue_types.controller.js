const { VenueTypes } = require("../models/venue_types.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postVenueTypes = async (req, res) => {
  try {
    const data = req.body;
    const newVenueTypes = new VenueTypes(data);
    await newVenueTypes.save();

    return res.status(201).json({
      success: true,
      message: "VenueTypes muvaffaqiyatli yaratildi.",
      data: newVenueTypes,
    });
  } catch (error) {
    console.error("Error creating VenueTypes:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Get All ---------------
const getVenueTypesList = async (req, res) => {
  try {
    const items = await VenueTypes.find();
    res.status(200).json({
      success: true,
      message: "Barcha venue_typeslar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching VenueTypesList:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateVenueTypes = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await VenueTypes.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "VenueTypes topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "VenueTypes muvaffaqiyatli yangilandi",
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
const deleteVenueTypes = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await VenueTypes.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "VenueTypes topilmadi" });
    }

    res.status(200).json({ message: "VenueTypes deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting VenueTypes:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getVenueTypesById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await VenueTypes.findById(id);

    if (!item) {
      return res.status(404).json({ message: "VenueTypes topilmadi" });
    }

    res.status(200).json({ message: "VenueTypes found", data: item });
  } catch (error) {
    console.error("Error getting VenueTypes by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postVenueTypes,
  getVenueTypesList,
  updateVenueTypes,
  deleteVenueTypes,
  getVenueTypesById,
};
