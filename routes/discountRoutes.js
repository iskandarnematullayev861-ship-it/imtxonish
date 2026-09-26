const { Router } = require("express");
const {
  postDiscount,
  searchDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
  getDiscountById,
} = require("../controllers/discount.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Discount
 *   description: Discount uchun API endpointlari
 */

/**
 * @swagger
 * /discount/create:
 *   post:
 *     summary: Yangi discount yaratish
 *     tags: [Discount]
 *     description: Yangi discount yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discount:
 *                 type: number
 *               finish_date:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postDiscount);

/**
 * @swagger
 * /discount/search:
 *   get:
 *     summary: Discount bo'yicha qidirish
 *     tags: [Discount]
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
router.get("/search", searchDiscount);

/**
 * @swagger
 * /discount/get:
 *   get:
 *     summary: Barcha discountlarni olish
 *     tags: [Discount]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getDiscounts);

/**
 * @swagger
 * /discount/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Discount]
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
router.get("/getById/:id", getDiscountById);

/**
 * @swagger
 * /discount/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Discount]
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
 *               discount:
 *                 type: number
 *               finish_date:
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
router.put("/update/:id", updateDiscount);

/**
 * @swagger
 * /discount/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Discount]
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
router.delete("/delete/:id", deleteDiscount);

module.exports = router;
