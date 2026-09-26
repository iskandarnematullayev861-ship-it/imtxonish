const { Router } = require("express");
const {
  postTypes,
  searchTypes,
  getTypesList,
  updateTypes,
  deleteTypes,
  getTypesById,
} = require("../controllers/types.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Types
 *   description: Types uchun API endpointlari
 */

/**
 * @swagger
 * /types/create:
 *   post:
 *     summary: Yangi types yaratish
 *     tags: [Types]
 *     description: Yangi types yaratish
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
router.post("/create", postTypes);

/**
 * @swagger
 * /types/search:
 *   get:
 *     summary: Types bo'yicha qidirish
 *     tags: [Types]
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
router.get("/search", searchTypes);

/**
 * @swagger
 * /types/get:
 *   get:
 *     summary: Barcha typeslarni olish
 *     tags: [Types]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getTypesList);

/**
 * @swagger
 * /types/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Types]
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
router.get("/getById/:id", getTypesById);

/**
 * @swagger
 * /types/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Types]
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
router.put("/update/:id", updateTypes);

/**
 * @swagger
 * /types/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Types]
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
router.delete("/delete/:id", deleteTypes);

module.exports = router;
