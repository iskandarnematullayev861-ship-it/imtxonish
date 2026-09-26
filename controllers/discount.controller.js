const { Discount } = require("../models/discount.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postDiscount = async (req, res) => {
  try {
    const data = req.body;
    const newDiscount = new Discount(data);
    await newDiscount.save();

    return res.status(201).json({
      success: true,
      message: "Discount muvaffaqiyatli yaratildi.",
      data: newDiscount,
    });
  } catch (error) {
    console.error("Error creating Discount:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search discount--------------------
const searchDiscount = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [
      { finish_date: { $regex: query, $options: "i" } },
    ];

    const numQuery = Number(query);
    if (!isNaN(numQuery)) {
      orConditions.push({ discount: numQuery });
    }

    const result = await Discount.find({ $or: orConditions });

    if (result.length === 0) {
      return res.json({ message: "Bunday chegirma topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching discount:", error);
    res.status(500).json({ message: "Server error: Failed to fetch discount." });
  }
};

// --------------- Get All ---------------
const getDiscounts = async (req, res) => {
  try {
    const items = await Discount.find();
    res.status(200).json({
      success: true,
      message: "Barcha discountlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Discounts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Discount.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Discount topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Discount muvaffaqiyatli yangilandi",
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
const deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Discount.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Discount topilmadi" });
    }

    res.status(200).json({ message: "Discount deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Discount:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Discount.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Discount topilmadi" });
    }

    res.status(200).json({ message: "Discount found", data: item });
  } catch (error) {
    console.error("Error getting Discount by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postDiscount,
  searchDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
};
