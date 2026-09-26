const { Ticket } = require("../models/ticket.model");
const mongoose = require("mongoose");

// --------------- Post / Create ---------------
const postTicket = async (req, res) => {
  try {
    const data = req.body;
    const newTicket = new Ticket(data);
    await newTicket.save();

    return res.status(201).json({
      success: true,
      message: "Ticket muvaffaqiyatli yaratildi.",
      data: newTicket,
    });
  } catch (error) {
    console.error("Error creating Ticket:", error);
    return res.status(500).json({
      success: false,
      message: "Server xatosi: Yaratish jarayonida xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------------search ticket--------------------
const searchTicket = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ message: "Invalid search query." });
    }

    const orConditions = [];

    const numQuery = Number(query);
    if (!isNaN(numQuery)) {
      orConditions.push({ price: numQuery });
      orConditions.push({ service_fee: numQuery });
    }

    const result = await Ticket.find(orConditions.length > 0 ? { $or: orConditions } : {});

    if (result.length === 0) {
      return res.json({ message: "Bunday chipta topilmadi" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Server error: Failed to fetch ticket." });
  }
};

// --------------- Get All ---------------
const getTickets = async (req, res) => {
  try {
    const items = await Ticket.find();
    res.status(200).json({
      success: true,
      message: "Barcha ticketlar muvaffaqiyatli olindi.",
      innerData: items,
    });
  } catch (error) {
    console.error("Error fetching Tickets:", error);
    res.status(500).json({
      success: false,
      message: "Server xatosi: Ma'lumotlarni olishda xato yuz berdi.",
      error: error.message,
    });
  }
};

// --------------- Update ---------------
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedItem = await Ticket.findByIdAndUpdate(id, data, { new: true, returnDocument: 'after' });

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Ticket topilmadi",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket muvaffaqiyatli yangilandi",
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
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Ticket.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Ticket topilmadi" });
    }

    res.status(200).json({ message: "Ticket deleted successfully", data: deletedItem });
  } catch (error) {
    console.error("Error deleting Ticket:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

// --------------- Get By Id ---------------
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Ticket.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Ticket topilmadi" });
    }

    res.status(200).json({ message: "Ticket found", data: item });
  } catch (error) {
    console.error("Error getting Ticket by id:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  postTicket,
  searchTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketById,
};
