const { Router } = require("express");
const {
  postDistrict,
  searchDistrict,
  getDistricts,
  updateDistrict,
  deleteDistrict,
  getDistrictById,
} = require("../controllers/district.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: District
 *   description: District uchun API endpointlari
 */

/**
 * @swagger
 * /district/create:
 *   post:
 *     summary: Yangi district yaratish
 *     tags: [District]
 *     description: Yangi district yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               region_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postDistrict);

/**
 * @swagger
 * /district/search:
 *   get:
 *     summary: District bo'yicha qidirish
 *     tags: [District]
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
router.get("/search", searchDistrict);

/**
 * @swagger
 * /district/get:
 *   get:
 *     summary: Barcha districtlarni olish
 *     tags: [District]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getDistricts);

/**
 * @swagger
 * /district/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [District]
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
router.get("/getById/:id", getDistrictById);

/**
 * @swagger
 * /district/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [District]
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
 *               region_id:
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
router.put("/update/:id", updateDistrict);

/**
 * @swagger
 * /district/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [District]
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
router.delete("/delete/:id", deleteDistrict);

module.exports = router;
