const { Router } = require("express");
const {
  postTicketStatus,
  searchTicketStatus,
  getTicketStatuses,
  updateTicketStatus,
  deleteTicketStatus,
  getTicketStatusById,
} = require("../controllers/ticket_status.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TicketStatus
 *   description: TicketStatus uchun API endpointlari
 */

/**
 * @swagger
 * /ticket_status/create:
 *   post:
 *     summary: Yangi ticket_status yaratish
 *     tags: [TicketStatus]
 *     description: Yangi ticket_status yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postTicketStatus);

/**
 * @swagger
 * /ticket_status/search:
 *   get:
 *     summary: TicketStatus bo'yicha qidirish
 *     tags: [TicketStatus]
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
router.get("/search", searchTicketStatus);

/**
 * @swagger
 * /ticket_status/get:
 *   get:
 *     summary: Barcha ticket_statuslarni olish
 *     tags: [TicketStatus]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getTicketStatuses);

/**
 * @swagger
 * /ticket_status/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [TicketStatus]
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
router.get("/getById/:id", getTicketStatusById);

/**
 * @swagger
 * /ticket_status/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [TicketStatus]
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
 *               name:
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
router.put("/update/:id", updateTicketStatus);

/**
 * @swagger
 * /ticket_status/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [TicketStatus]
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
router.delete("/delete/:id", deleteTicketStatus);

module.exports = router;
