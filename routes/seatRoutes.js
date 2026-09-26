const { Router } = require("express");
const {
  postSeat,
  searchSeat,
  getSeats,
  updateSeat,
  deleteSeat,
  getSeatById,
} = require("../controllers/seat.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: Seat uchun API endpointlari
 */

/**
 * @swagger
 * /seat/create:
 *   post:
 *     summary: Yangi seat yaratish
 *     tags: [Seat]
 *     description: Yangi seat yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_id:
 *                 type: string
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postSeat);

/**
 * @swagger
 * /seat/search:
 *   get:
 *     summary: Seat bo'yicha qidirish
 *     tags: [Seat]
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
router.get("/search", searchSeat);

/**
 * @swagger
 * /seat/get:
 *   get:
 *     summary: Barcha seatlarni olish
 *     tags: [Seat]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getSeats);

/**
 * @swagger
 * /seat/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Seat]
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
router.get("/getById/:id", getSeatById);

/**
 * @swagger
 * /seat/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Seat]
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
 *               sector_id:
 *                 type: string
 *               row_number:
 *                 type: number
 *               number:
 *                 type: number
 *               venue_id:
 *                 type: string
 *               seat_type_id:
 *                 type: string
 *               location_in_schema:
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
router.put("/update/:id", updateSeat);

/**
 * @swagger
 * /seat/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Seat]
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
router.delete("/delete/:id", deleteSeat);

module.exports = router;
