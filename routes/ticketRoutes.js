const { Router } = require("express");
const {
  postTicket,
  searchTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  getTicketById,
} = require("../controllers/ticket.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Ticket uchun API endpointlari
 */

/**
 * @swagger
 * /ticket/create:
 *   post:
 *     summary: Yangi ticket yaratish
 *     tags: [Ticket]
 *     description: Yangi ticket yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postTicket);

/**
 * @swagger
 * /ticket/search:
 *   get:
 *     summary: Ticket bo'yicha qidirish
 *     tags: [Ticket]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari
 *       '404':
 *         description: Topilmadi
 *       '500':
 *         description: Server xatosi
 */
router.get("/search", searchTicket);

/**
 * @swagger
 * /ticket/get:
 *   get:
 *     summary: Barcha ticketlarni olish
 *     tags: [Ticket]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getTickets);

/**
 * @swagger
 * /ticket/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli qaytarildi
 *       '404':
 *         description: Topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/getById/:id", getTicketById);

/**
 * @swagger
 * /ticket/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event_id:
 *                 type: string
 *               seat_id:
 *                 type: string
 *               price:
 *                 type: number
 *               service_fee:
 *                 type: number
 *               status_id:
 *                 type: string
 *               ticket_type_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli tahrirlandi
 *       '400':
 *         description: Validatsiya xatosi
 *       '404':
 *         description: Topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.put("/update/:id", updateTicket);

/**
 * @swagger
 * /ticket/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli o'chirildi
 *       '404':
 *         description: Topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
router.delete("/delete/:id", deleteTicket);

module.exports = router;
