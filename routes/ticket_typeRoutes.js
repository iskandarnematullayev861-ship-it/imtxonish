const { Router } = require("express");
const {
  postTicketType,
  searchTicketType,
  getTicketTypes,
  updateTicketType,
  deleteTicketType,
  getTicketTypeById,
} = require("../controllers/ticket_type.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TicketType
 *   description: TicketType uchun API endpointlari
 */

/**
 * @swagger
 * /ticket_type/create:
 *   post:
 *     summary: Yangi ticket_type yaratish
 *     tags: [TicketType]
 *     description: Yangi ticket_type yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postTicketType);

/**
 * @swagger
 * /ticket_type/search:
 *   get:
 *     summary: TicketType bo'yicha qidirish
 *     tags: [TicketType]
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
router.get("/search", searchTicketType);

/**
 * @swagger
 * /ticket_type/get:
 *   get:
 *     summary: Barcha ticket_typelarni olish
 *     tags: [TicketType]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getTicketTypes);

/**
 * @swagger
 * /ticket_type/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [TicketType]
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
router.get("/getById/:id", getTicketTypeById);

/**
 * @swagger
 * /ticket_type/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [TicketType]
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
 *               ticket_type:
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
router.put("/update/:id", updateTicketType);

/**
 * @swagger
 * /ticket_type/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [TicketType]
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
router.delete("/delete/:id", deleteTicketType);

module.exports = router;
