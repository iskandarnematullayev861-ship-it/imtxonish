const { Router } = require("express");
const {
  postFlat,
  searchFlat,
  getFlats,
  updateFlat,
  deleteFlat,
  getFlatById,
} = require("../controllers/flat.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Flat
 *   description: Flat uchun API endpointlari
 */

/**
 * @swagger
 * /flat/create:
 *   post:
 *     summary: Yangi flat yaratish
 *     tags: [Flat]
 *     description: Yangi flat yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               etaj:
 *                 type: number
 *               condition:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postFlat);

/**
 * @swagger
 * /flat/search:
 *   get:
 *     summary: Flat bo'yicha qidirish
 *     tags: [Flat]
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
router.get("/search", searchFlat);

/**
 * @swagger
 * /flat/get:
 *   get:
 *     summary: Barcha flatlarni olish
 *     tags: [Flat]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getFlats);

/**
 * @swagger
 * /flat/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Flat]
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
router.get("/getById/:id", getFlatById);

/**
 * @swagger
 * /flat/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Flat]
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
 *               etaj:
 *                 type: number
 *               condition:
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
router.put("/update/:id", updateFlat);

/**
 * @swagger
 * /flat/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Flat]
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
router.delete("/delete/:id", deleteFlat);

module.exports = router;
