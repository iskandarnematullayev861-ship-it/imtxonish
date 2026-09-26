const { PaymentMethod } = require("../models/payment_method.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postPaymentMethod = async (req, res) => {
  try {
    const data = req.body;
    const newPaymentMethod = new PaymentMethod(data);
    await newPaymentMethod.save();

    return res.status(201).json({
      success: true,
      message: "PaymentMethod muvaffaqiyatli yaratildi.",
      data: newPaymentMethod,
    });
  } catch (error) {
    console.error("Error creating PaymentMethod:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search payment method--------------------
const searchPaymentMethod = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await PaymentMethod.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday to'lov usuli topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching payment method:", error);
    res.status(500).json({ message: "Server error: Failed to fetch payment method." });
  }
};

// --------------- Get All ---------------
const getPaymentMethods = async (req, res) => {
  try {
    const items = await PaymentMethod.find();
    res.status(200).json({
      success: true,
      message: "Barcha payment_methodlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching PaymentMethods:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await PaymentMethod.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "PaymentMethod topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "PaymentMethod muvaffaqiyatli yangilandi",
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
const deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await PaymentMethod.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "PaymentMethod topilmadi" });
    }

    res.status(200).json({ message: "PaymentMethod deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting PaymentMethod:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getPaymentMethodById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await PaymentMethod.findById(id);

    if (!item) {
      return res.status(404).json({ message: "PaymentMethod topilmadi" });
    }

    res.status(200).json({ message: "PaymentMethod found", data: item });
  } catch (error) {
    console.error("Error getting PaymentMethod by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postPaymentMethod,
  searchPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
};
