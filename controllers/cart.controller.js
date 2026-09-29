const { Cart } = require("../models/cart.model");
const mongoose = require("mongoose");

const populateCart = (query) =>
  query
    .populate("customer_id")
    .populate("status_id");

// --------------- Post / Create ---------------
const postCart = async (req, res) => {
  try {
    const data = req.body;
    const newCart = new Cart(data);
    await newCart.save();

    const populated = await populateCart(Cart.findById(newCart._id));

    return res.status(201).json({
      success: true,
      message: "Cart muvaffaqiyatli yaratildi.",
      data: populated,
    });
  } catch (error) {
    console.error("Error creating Cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search cart--------------------
const searchCart = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [];

    if (mongoose.Types.ObjectId.isValid(query)) {
      orConditions.push({ _id: query });
      orConditions.push({ customer_id: query });
      orConditions.push({ status_id: query });
    }

    const result = await populateCart(
      Cart.find(orConditions.length > 0 ? { $or: orConditions } : {})
    );

    if (result.length === 0) {
      return res.json({ message: "Bunday savatcha topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error: Failed to fetch cart." });
  }
};

// --------------- Get All ---------------
const getCarts = async (req, res) => {
  try {
    const items = await populateCart(Cart.find());
    res.status(200).json({
      success: true,
      message: "Barcha cartlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Carts:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateCart(
      Cart.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Cart topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart muvaffaqiyatli yangilandi",
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
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart topilmadi" });
    }

    res.status(200).json({ message: "Cart deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Cart:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCartById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateCart(Cart.findById(id));

    if (!item) {
      return res.status(404).json({ message: "Cart topilmadi" });
    }

    res.status(200).json({ message: "Cart found", data: item });
  } catch (error) {
    console.error("Error getting Cart by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postCart,
  searchCart,
  getCarts,
  updateCart,
  deleteCart,
  getCartById,
};
