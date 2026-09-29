const { Booking } = require("../models/booking.model");
const { bookingValidationSchema } = require("../Validation/booking.validation");
const mongoose = require("mongoose");

const isValidObjectId = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

const populateBooking = (query) =>
  query
    .populate("cart_id")
    .populate("payment_method_id")
    .populate("delivery_method_id")
    .populate("discount_id")
    .populate("status_id");

// --------------- Post / Create ---------------
const postBooking = async (req, res) => {
  try {
    const { error, value } = bookingValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validatsiya xatoligi",
        errors: error.details.map((err) => err.message),
      });
    }

    const data = { ...value };
    delete data.createdAt;
    if (data.discount_id === "") delete data.discount_id;

    const newBooking = new Booking(data);
    await newBooking.save();

    const populated = await populateBooking(Booking.findById(newBooking._id));

    return res.status(201).json({
      success: true,
      message: "Booking muvaffaqiyatli yaratildi.",
      data: populated,
    });
  } catch (error) {
    console.error("Error creating Booking:", error);
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

// --------------------search booking--------------------
const searchBooking = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [];

    if (isValidObjectId(query)) {
      orConditions.push({ _id: query });
      orConditions.push({ cart_id: query });
      orConditions.push({ payment_method_id: query });
      orConditions.push({ delivery_method_id: query });
      orConditions.push({ discount_id: query });
      orConditions.push({ status_id: query });
    }

    const result = await populateBooking(
      Booking.find(orConditions.length > 0 ? { $or: orConditions } : {})
    );

    if (result.length === 0) {
      return res.json({ message: "Bunday buyurtma topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error: Failed to fetch booking." });
  }
};

// --------------- Get All ---------------
const getBookings = async (req, res) => {
  try {
    const items = await populateBooking(Booking.find());
    res.status(200).json({
      success: true,
      message: "Barcha bookinglar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Bookings:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Validatsiya xatoligi: Kiritilgan ID (param) to'g'ri ObjectId emas." });
      }

    const updatedItem = await populateBooking(
      Booking.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' })
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Booking topilmadi" });
    }

    res.status(200).json({
      success: true,
      message: "Booking muvaffaqiyatli yangilandi",
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
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const deletedItem = await Booking.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Booking topilmadi" });
    }

    res.status(200).json({ message: "Booking deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Booking:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Validatsiya xatoligi: Noto'g'ri ObjectId kiritildi" });
    }

    const item = await populateBooking(Booking.findById(id));

    if (!item) {
      return res.status(404).json({ message: "Booking topilmadi" });
    }

    res.status(200).json({ message: "Booking found", data: item });
  } catch (error) {
    console.error("Error getting Booking by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postBooking,
  searchBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getBookingById,
};
