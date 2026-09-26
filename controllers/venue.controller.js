const { Venue } = require("../models/venue.model");
const { Region } = require("../models/region.model");
const { District } = require("../models/district.model");
const { venueValidationSchema } = require("../Validation/venue.validation");
const mongoose = require("mongoose");

const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

// --------------- Post / Create ---------------
const postVenue = async (req, res) => {
  try {
    const data = req.body;

    if (data.region_id && !isValidObjectId(data.region_id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: region_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
      });
    }

    if (data.district_id && !isValidObjectId(data.district_id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: district_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
      });
    }

    const newVenue = new Venue(data);
    await newVenue.save();

    return res.status(201).json({
      success: true,
      message: "Venue muvaffaqiyatli yaratildi.",
      data: newVenue,
    });
  } catch (error) {
    console.error("Error creating Venue:", error);
    if (error.name === "CastError" || error.name === "BSONError" || (error.message && error.message.includes("24 character hex string"))) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: Noto'g'ri ID (ObjectId) kiritildi.",
        error: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search venue--------------------
const searchVenue = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Venue.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { site: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday joy topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching venue:", error);
    res.status(500).json({ message: "Server error: Failed to fetch venue." });
  }
};

// --------------- Get All ---------------
const getVenues = async (req, res) => {
  try {
    const items = await Venue.find();
    res.status(200).json({
      success: true,
      message: "Barcha venuelar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Venues:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: Kiritilgan ID (param) to'g'ri ObjectId emas.",
      });
    }

    if (data.region_id && !isValidObjectId(data.region_id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: region_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
      });
    }

    if (data.district_id && !isValidObjectId(data.district_id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: district_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
      });
    }

    const updatedItem = await Venue.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Venue topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Venue muvaffaqiyatli yangilandi",
      data: updatedItem,
    });
  } catch (error) {
    if (error.name === "CastError" || error.name === "BSONError" || (error.message && error.message.includes("24 character hex string"))) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: Noto'g'ri ID (ObjectId) kiritildi.",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// --------------- Delete ---------------
const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const deletedItem = await Venue.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Venue topilmadi" });
    }

    res.status(200).json({ message: "Venue deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Venue:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getVenueById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const item = await Venue.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Venue topilmadi" });
    }

    res.status(200).json({ message: "Venue found", data: item });
  } catch (error) {
    console.error("Error getting Venue by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postVenue,
  searchVenue,
  getVenues,
  updateVenue,
  deleteVenue,
  getVenueById,
};
