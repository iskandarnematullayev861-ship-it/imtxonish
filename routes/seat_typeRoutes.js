const { Router } = require("express");
const {
  postSeatType,
  searchSeatType,
  getSeatTypes,
  updateSeatType,
  deleteSeatType,
  getSeatTypeById,
} = require("../controllers/seat_type.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: SeatType
 *   description: SeatType uchun API endpointlari
 */

/**
 * @swagger
 * /seat_type/create:
 *   post:
 *     summary: Yangi seat_type yaratish
 *     tags: [SeatType]
 *     description: Yangi seat_type yaratish
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
router.post("/create", postSeatType);

/**
 * @swagger
 * /seat_type/search:
 *   get:
 *     summary: SeatType bo'yicha qidirish
 *     tags: [SeatType]
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
router.get("/search", searchSeatType);

/**
 * @swagger
 * /seat_type/get:
 *   get:
 *     summary: Barcha seat_typelarni olish
 *     tags: [SeatType]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getSeatTypes);

/**
 * @swagger
 * /seat_type/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [SeatType]
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
router.get("/getById/:id", getSeatTypeById);

/**
 * @swagger
 * /seat_type/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [SeatType]
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
router.put("/update/:id", updateSeatType);

/**
 * @swagger
 * /seat_type/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [SeatType]
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
router.delete("/delete/:id", deleteSeatType);

module.exports = router;
