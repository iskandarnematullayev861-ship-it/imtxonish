const { Router } = require("express");
const {
  postHumanCategory,
  searchHumanCategory,
  getHumanCategories,
  updateHumanCategory,
  deleteHumanCategory,
  getHumanCategoryById,
} = require("../controllers/human_category.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: HumanCategory
 *   description: HumanCategory uchun API endpointlari
 */

/**
 * @swagger
 * /human_category/create:
 *   post:
 *     summary: Yangi human_category yaratish
 *     tags: [HumanCategory]
 *     description: Yangi human_category yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postHumanCategory);

/**
 * @swagger
 * /human_category/search:
 *   get:
 *     summary: HumanCategory bo'yicha qidirish
 *     tags: [HumanCategory]
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
router.get("/search", searchHumanCategory);

/**
 * @swagger
 * /human_category/get:
 *   get:
 *     summary: Barcha human_categorylarni olish
 *     tags: [HumanCategory]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getHumanCategories);

/**
 * @swagger
 * /human_category/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [HumanCategory]
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
router.get("/getById/:id", getHumanCategoryById);

/**
 * @swagger
 * /human_category/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [HumanCategory]
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
 *               start_age:
 *                 type: number
 *               finish_age:
 *                 type: number
 *               gender_id:
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
router.put("/update/:id", updateHumanCategory);

/**
 * @swagger
 * /human_category/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [HumanCategory]
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
router.delete("/delete/:id", deleteHumanCategory);

module.exports = router;
