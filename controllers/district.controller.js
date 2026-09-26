const { District } = require("../models/district.model");
const { Region } = require("../models/region.model");
const { districtValidationSchema } = require("../Validation/district.validation");
const mongoose = require("mongoose");

const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

// --------------- Post / Create ---------------
const postDistrict = async (req, res) => {
  try {
    const { error, value } = districtValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi",
        errors: error.details.map((err) => err.message),
      });
    }

    const data = { ...value };

    if (data.region_id) {
      if (!isValidObjectId(data.region_id)) {
        return res.status(400).json({
          success: false,
          message: "Validatsiya xatoligi: region_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
        });
      }
      const regionExists = await Region.findById(data.region_id);
      if (!regionExists) {
        return res.status(400).json({
          success: false,
          message: "Validatsiya xatoligi: Kiritilgan region_id bazada topilmadi.",
        });
      }
    }

    const newDistrict = new District(data);
    await newDistrict.save();

    return res.status(201).json({
      success: true,
      message: "District muvaffaqiyatli yaratildi.",
      data: newDistrict,
    });
  } catch (error) {
    console.error("Error creating District:", error);
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

// --------------------search district--------------------
const searchDistrict = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await District.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday tuman topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching district:", error);
    res.status(500).json({ message: "Server error: Failed to fetch district." });
  }
};

// --------------- Get All ---------------
const getDistricts = async (req, res) => {
  try {
    const items = await District.find();
    res.status(200).json({
      success: true,
      message: "Barcha districtlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Districts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateDistrict = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi: Kiritilgan ID (param) to'g'ri ObjectId emas.",
      });
    }

    if (data.region_id) {
      if (!isValidObjectId(data.region_id)) {
        return res.status(400).json({
          success: false,
          message: "Validatsiya xatoligi: region_id to'g'ri 24-belgili ObjectId bo'lishi kerak.",
        });
      }
      const regionExists = await Region.findById(data.region_id);
      if (!regionExists) {
        return res.status(400).json({
          success: false,
          message: "Validatsiya xatoligi: Kiritilgan region_id bazada topilmadi.",
        });
      }
    }

    const updatedItem = await District.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "District topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "District muvaffaqiyatli yangilandi",
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
const deleteDistrict = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const deletedItem = await District.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "District topilmadi" });
    }

    res.status(200).json({ message: "District deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting District:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getDistrictById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const item = await District.findById(id);

    if (!item) {
      return res.status(404).json({ message: "District topilmadi" });
    }

    res.status(200).json({ message: "District found", data: item });
  } catch (error) {
    console.error("Error getting District by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postDistrict,
  searchDistrict,
  getDistricts,
  updateDistrict,
  deleteDistrict,
  getDistrictById,
};
