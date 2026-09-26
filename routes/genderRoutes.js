const { Router } = require("express");
const {
  postGender,
  searchGender,
  getGenders,
  updateGender,
  deleteGender,
  getGenderById,
} = require("../controllers/gender.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gender
 *   description: Gender uchun API endpointlari
 */

/**
 * @swagger
 * /gender/create:
 *   post:
 *     summary: Yangi gender yaratish
 *     tags: [Gender]
 *     description: Yangi gender yaratish
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
router.post("/create", postGender);

/**
 * @swagger
 * /gender/search:
 *   get:
 *     summary: Gender bo'yicha qidirish
 *     tags: [Gender]
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
router.get("/search", searchGender);

/**
 * @swagger
 * /gender/get:
 *   get:
 *     summary: Barcha genderlarni olish
 *     tags: [Gender]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getGenders);

/**
 * @swagger
 * /gender/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Gender]
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
router.get("/getById/:id", getGenderById);

/**
 * @swagger
 * /gender/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Gender]
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
router.put("/update/:id", updateGender);

/**
 * @swagger
 * /gender/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Gender]
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
router.delete("/delete/:id", deleteGender);

module.exports = router;
