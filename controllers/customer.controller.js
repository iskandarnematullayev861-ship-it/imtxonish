const { Customer } = require("../models/customer.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postCustomer = async (req, res) => {
  try {
    const data = req.body;

    if (data.phone) {
      const existingCustomer = await Customer.findOne({ phone: data.phone });
      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "Bu telefon raqami bilan customer allaqachon ro'yxatdan o'tgan.",
        });
      }
    }

    const newCustomer = new Customer(data);
    await newCustomer.save();

    return res.status(201).json({
      success: true,
      message: "Customer muvaffaqiyatli yaratildi.",
      data: newCustomer,
    });
  } catch (error) {
    console.error("Error creating Customer:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bu telefon raqam yoki unikal ma'lumot allaqachon mavjud.",
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

// --------------------search customer--------------------
const searchCustomer = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Customer.find({
      $or: [
        { first_name: { $regex: query, $options: "i" } },
        { last_name: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday mijoz topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customer." });
  }
};

// --------------- Get All ---------------
const getCustomers = async (req, res) => {
  try {
    const items = await Customer.find();
    res.status(200).json({
      success: true,
      message: "Barcha customerlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Customers:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.phone) {
      const existingCustomer = await Customer.findOne({ phone: data.phone, _id: { $ne: id } });
      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "Bu telefon raqami boshqa customerga tegishli.",
        });
      }
    }

    const updatedItem = await Customer.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Customer topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer muvaffaqiyatli yangilandi",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating Customer:", error);
    if (error.code === 11000 || (error.message && error.message.includes("E11000"))) {
      return res.status(400).json({
        success: false,
        message: "Bu telefon raqam yoki unikal ma'lumot allaqachon mavjud.",
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
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Customer.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Customer topilmadi" });
    }

    res.status(200).json({ message: "Customer deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Customer:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Customer.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Customer topilmadi" });
    }

    res.status(200).json({ message: "Customer found", data: item });
  } catch (error) {
    console.error("Error getting Customer by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postCustomer,
  searchCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
