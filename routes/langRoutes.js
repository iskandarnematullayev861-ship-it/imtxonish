const { Router } = require("express");
const {
  postLang,
  searchLang,
  getLangs,
  updateLang,
  deleteLang,
  getLangById,
} = require("../controllers/lang.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Lang
 *   description: Lang uchun API endpointlari
 */

/**
 * @swagger
 * /lang/create:
 *   post:
 *     summary: Yangi lang yaratish
 *     tags: [Lang]
 *     description: Yangi lang yaratish
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
router.post("/create", postLang);

/**
 * @swagger
 * /lang/search:
 *   get:
 *     summary: Lang bo'yicha qidirish
 *     tags: [Lang]
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
router.get("/search", searchLang);

/**
 * @swagger
 * /lang/get:
 *   get:
 *     summary: Barcha langlarni olish
 *     tags: [Lang]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getLangs);

/**
 * @swagger
 * /lang/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Lang]
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
router.get("/getById/:id", getLangById);

/**
 * @swagger
 * /lang/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Lang]
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
router.put("/update/:id", updateLang);

/**
 * @swagger
 * /lang/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Lang]
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
router.delete("/delete/:id", deleteLang);

module.exports = router;
