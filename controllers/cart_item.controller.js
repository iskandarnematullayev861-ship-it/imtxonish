const { CartItem } = require("../models/cart_item.model");
const { cartItemValidationSchema } = require("../Validation/cart_item.validation");
const mongoose = require("mongoose");

const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

// --------------- Post / Create ---------------
const postCartItem = async (req, res) => {
  try {
    const { error, value } = cartItemValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi",
        errors: error.details.map((err) => err.message),
      });
    }

    const data = { ...value };

    const newCartItem = new CartItem(data);
    await newCartItem.save();

    return res.status(201).json({
      success: true,
      message: "CartItem muvaffaqiyatli yaratildi.",
      data: newCartItem,
    });
  } catch (error) {
    console.error("Error creating CartItem:", error);
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

// --------------- Get All ---------------
const getCartItems = async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).json({
      success: true,
      message: "Barcha cart_itemlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching CartItems:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Validatsiya xatoligi: Kiritilgan ID (param) to'g'ri ObjectId emas." });
    }
    if (data.cart_id && !isValidObjectId(data.cart_id)) {
      return res.status(400).json({ success: false, message: "Validatsiya xatoligi: cart_id to'g'ri 24-belgili ObjectId bo'lishi kerak." });
    }
    if (data.ticket_id && !isValidObjectId(data.ticket_id)) {
      return res.status(400).json({ success: false, message: "Validatsiya xatoligi: ticket_id to'g'ri 24-belgili ObjectId bo'lishi kerak." });
    }

    const updatedItem = await CartItem.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "CartItem topilmadi" });
    }

    res.status(200).json({
      success: true,
      message: "CartItem muvaffaqiyatli yangilandi",
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
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// --------------- Delete ---------------
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const deletedItem = await CartItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "CartItem topilmadi" });
    }

    res.status(200).json({ message: "CartItem deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting CartItem:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCartItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const item = await CartItem.findById(id);

    if (!item) {
      return res.status(404).json({ message: "CartItem topilmadi" });
    }

    res.status(200).json({ message: "CartItem found", data: item });
  } catch (error) {
    console.error("Error getting CartItem by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------------search cart item--------------------
const searchCartItem = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [];

    if (isValidObjectId(query)) {
      orConditions.push({ _id: query });
      orConditions.push({ cart_id: query });
      orConditions.push({ ticket_id: query });
    }

    const result = await CartItem.find(orConditions.length > 0 ? { $or: orConditions } : {});

    if (result.length === 0) {
      return res.json({ message: "Bunday element topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching cart item:", error);
    res.status(500).json({ message: "Server error: Failed to fetch cart item." });
  }
};

module.exports = {
  postCartItem,
  searchCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  getCartItemById,
};
