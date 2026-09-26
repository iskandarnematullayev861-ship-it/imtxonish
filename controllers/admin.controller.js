const { Admin } = require("../models/admin.model");
const mongoose = require("mongoose");
// --------------- Post / Create ---------------
const postAdmin = async (req, res) => {
  try {
    const data = req.body;


    const existingAdmin = await Admin.findOne({
      login: data.login,
    });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Bu login allaqachon mavjud.",
      });
    }

    const newAdmin = new Admin(data);
    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin muvaffaqiyatli yaratildi.",
    });
  } catch (error) {
    console.error("Error creating Admin:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Bu login allaqachon mavjud.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search admin--------------------
const searchAdmin = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await Admin.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { login: { $regex: query, $options: "i" } },
      ],
    });

    if (result.length === 0) {
      return res.json({ message: "Bunday admin topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching admin:", error);
    res.status(500).json({ message: "Server error: Failed to fetch admin." });
  }
};

// --------------- Get All ---------------
const getAdmins = async (req, res) => {
  try {
    const items = await Admin.find();
    res.status(200).json({
      success: true,
      message: "Barcha adminlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Admins:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Admin.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Admin topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin muvaffaqiyatli yangilandi",
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
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Admin.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    res.status(200).json({ message: "Admin deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Admin:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Admin.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Admin topilmadi" });
    }

    res.status(200).json({ message: "Admin found", data: item });
  } catch (error) {
    console.error("Error getting Admin by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postAdmin,
  searchAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getAdminById,
};
