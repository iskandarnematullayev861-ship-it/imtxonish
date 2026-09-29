const { CustomerCard } = require("../models/customer_card.model");
const mongoose = require("mongoose");

const populateCustomerCard = (query) => query.populate("customer_id");

// --------------- Post / Create ---------------
const postCustomerCard = async (req, res) => {
  try {
    const data = req.body;
    const newCustomerCard = new CustomerCard(data);
    await newCustomerCard.save();

    return res.status(201).json({
      success: true,
      message: "CustomerCard muvaffaqiyatli yaratildi.",
      data: newCustomerCard,
    });
  } catch (error) {
    console.error("Error creating CustomerCard:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search customer card--------------------
const searchCustomerCard = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await populateCustomerCard(
      CustomerCard.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
          { number: { $regex: query, $options: "i" } },
          { year: { $regex: query, $options: "i" } },
          { month: { $regex: query, $options: "i" } },
        ],
      })
    );

    if (result.length === 0) {
      return res.json({ message: "Bunday karta topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customer card:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customer card." });
  }
};

// --------------- Get All ---------------
const getCustomerCards = async (req, res) => {
  try {
    const items = await populateCustomerCard(CustomerCard.find());
    res.status(200).json({
      success: true,
      message: "Barcha customer_cardlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching CustomerCards:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCustomerCard = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateCustomerCard(
      CustomerCard.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "CustomerCard topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "CustomerCard muvaffaqiyatli yangilandi",
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
const deleteCustomerCard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await CustomerCard.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "CustomerCard topilmadi" });
    }

    res.status(200).json({ message: "CustomerCard deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting CustomerCard:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCustomerCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateCustomerCard(CustomerCard.findById(id));

    if (!item) {
      return res.status(404).json({ message: "CustomerCard topilmadi" });
    }

    res.status(200).json({ message: "CustomerCard found", data: item });
  } catch (error) {
    console.error("Error getting CustomerCard by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postCustomerCard,
  searchCustomerCard,
  getCustomerCards,
  updateCustomerCard,
  deleteCustomerCard,
  getCustomerCardById,
};

