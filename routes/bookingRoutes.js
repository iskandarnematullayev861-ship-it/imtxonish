const { Router } = require("express");
const {
  postBooking,
  searchBooking,
  getBookings,
  updateBooking,
  deleteBooking,
  getBookingById,
} = require("../controllers/booking.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Booking uchun API endpointlari
 */

/**
 * @swagger
 * /booking/create:
 *   post:
 *     summary: Yangi booking yaratish
 *     tags: [Booking]
 *     description: Yangi booking yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *               finished:
 *                 type: string
 *               payment_method_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_id:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postBooking);

/**
 * @swagger
 * /booking/search:
 *   get:
 *     summary: Booking bo'yicha qidirish
 *     tags: [Booking]
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
router.get("/search", searchBooking);

/**
 * @swagger
 * /booking/get:
 *   get:
 *     summary: Barcha bookinglarni olish
 *     tags: [Booking]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getBookings);

/**
 * @swagger
 * /booking/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Booking]
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
router.get("/getById/:id", getBookingById);

/**
 * @swagger
 * /booking/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Booking]
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
 *               cart_id:
 *                 type: string
 *               finished:
 *                 type: string
 *               payment_method_id:
 *                 type: string
 *               delivery_method_id:
 *                 type: string
 *               discount_id:
 *                 type: string
 *               status_id:
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
router.put("/update/:id", updateBooking);

/**
 * @swagger
 * /booking/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Booking]
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
router.delete("/delete/:id", deleteBooking);

module.exports = router;
