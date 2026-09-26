const { DeliveryMethod } = require("../models/delivery_method.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postDeliveryMethod = async (req, res) => {
  try {
    const data = req.body;
    const newDeliveryMethod = new DeliveryMethod(data);
    await newDeliveryMethod.save();

    return res.status(201).json({
      success: true,
      message: "DeliveryMethod muvaffaqiyatli yaratildi.",
      data: newDeliveryMethod,
    });
  } catch (error) {
    console.error("Error creating DeliveryMethod:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search delivery method--------------------
const searchDeliveryMethod = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await DeliveryMethod.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday yetkazib berish usuli topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching delivery method:", error);
    res.status(500).json({ message: "Server error: Failed to fetch delivery method." });
  }
};

// --------------- Get All ---------------
const getDeliveryMethods = async (req, res) => {
  try {
    const items = await DeliveryMethod.find();
    res.status(200).json({
      success: true,
      message: "Barcha delivery_methodlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching DeliveryMethods:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateDeliveryMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await DeliveryMethod.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "DeliveryMethod topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "DeliveryMethod muvaffaqiyatli yangilandi",
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
const deleteDeliveryMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await DeliveryMethod.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "DeliveryMethod topilmadi" });
    }

    res.status(200).json({ message: "DeliveryMethod deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting DeliveryMethod:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getDeliveryMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await DeliveryMethod.findById(id);

    if (!item) {
      return res.status(404).json({ message: "DeliveryMethod topilmadi" });
    }

    res.status(200).json({ message: "DeliveryMethod found", data: item });
  } catch (error) {
    console.error("Error getting DeliveryMethod by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postDeliveryMethod,
  searchDeliveryMethod,
  getDeliveryMethods,
  updateDeliveryMethod,
  deleteDeliveryMethod,
  getDeliveryMethodById,
};
