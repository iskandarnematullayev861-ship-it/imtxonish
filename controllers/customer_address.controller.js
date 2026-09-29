const { CustomerAddress } = require("../models/customer_address.model");
const mongoose = require("mongoose");

const populateCustomerAddress = (query) =>
  query
    .populate("customer_id")
    .populate("region_id")
    .populate("district_id")
    .populate("flat_id");

// --------------- Post / Create ---------------
const postCustomerAddress = async (req, res) => {
  try {
    const data = req.body;
    const newCustomerAddress = new CustomerAddress(data);
    await newCustomerAddress.save();

    const populated = await populateCustomerAddress(CustomerAddress.findById(newCustomerAddress._id));

    return res.status(201).json({
      success: true,
      message: "CustomerAddress muvaffaqiyatli yaratildi.",
      data: populated,
    });
  } catch (error) {
    console.error("Error creating CustomerAddress:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search customer address--------------------
const searchCustomerAddress = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const result = await populateCustomerAddress(CustomerAddress.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { street: { $regex: query, $options: "i" } },
        { house: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { post_index: { $regex: query, $options: "i" } },
        { info: { $regex: query, $options: "i" } },
      ],
    }));

    if (result.length === 0) {
      return res.json({ message: "Bunday manzil topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching customer address:", error);
    res.status(500).json({ message: "Server error: Failed to fetch customer address." });
  }
};

// --------------- Get All ---------------
const getCustomerAddresses = async (req, res) => {
  try {
    const items = await populateCustomerAddress(CustomerAddress.find());
    res.status(200).json({
      success: true,
      message: "Barcha customer_addresslar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching CustomerAddresses:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await populateCustomerAddress(
      CustomerAddress.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "CustomerAddress topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "CustomerAddress muvaffaqiyatli yangilandi",
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
const deleteCustomerAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await CustomerAddress.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "CustomerAddress topilmadi" });
    }

    res.status(200).json({ message: "CustomerAddress deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting CustomerAddress:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getCustomerAddressById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await populateCustomerAddress(CustomerAddress.findById(id));

    if (!item) {
      return res.status(404).json({ message: "CustomerAddress topilmadi" });
    }

    res.status(200).json({ message: "CustomerAddress found", data: item });
  } catch (error) {
    console.error("Error getting CustomerAddress by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postCustomerAddress,
  searchCustomerAddress,
  getCustomerAddresses,
  updateCustomerAddress,
  deleteCustomerAddress,
  getCustomerAddressById,
};
