const { VenuePhoto } = require("../models/venue_photo.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postVenuePhoto = async (req, res) => {
  try {
    const data = req.body;
    const newVenuePhoto = new VenuePhoto(data);
    await newVenuePhoto.save();

    return res.status(201).json({
      success: true,
      message: "VenuePhoto muvaffaqiyatli yaratildi.",
      data: newVenuePhoto,
    });
  } catch (error) {
    console.error("Error creating VenuePhoto:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search venue photo--------------------
const searchVenuePhoto = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await VenuePhoto.find({
      $or: [
        { url: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday rasm topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching venue photo:", error);
    res.status(500).json({ message: "Server error: Failed to fetch venue photo." });
  }
};

// --------------- Get All ---------------
const getVenuePhotos = async (req, res) => {
  try {
    const items = await VenuePhoto.find();
    res.status(200).json({
      success: true,
      message: "Barcha venue_photolar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching VenuePhotos:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateVenuePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await VenuePhoto.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "VenuePhoto topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "VenuePhoto muvaffaqiyatli yangilandi",
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
const deleteVenuePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await VenuePhoto.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "VenuePhoto topilmadi" });
    }

    res.status(200).json({ message: "VenuePhoto deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting VenuePhoto:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getVenuePhotoById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await VenuePhoto.findById(id);

    if (!item) {
      return res.status(404).json({ message: "VenuePhoto topilmadi" });
    }

    res.status(200).json({ message: "VenuePhoto found", data: item });
  } catch (error) {
    console.error("Error getting VenuePhoto by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postVenuePhoto,
  searchVenuePhoto,
  getVenuePhotos,
  updateVenuePhoto,
  deleteVenuePhoto,
  getVenuePhotoById,
};
