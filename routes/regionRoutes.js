const { Router } = require("express");
const {
  postRegion,
  searchRegion,
  getRegions,
  updateRegion,
  deleteRegion,
  getRegionById,
} = require("../controllers/region.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Region
 *   description: Region uchun API endpointlari
 */

/**
 * @swagger
 * /region/create:
 *   post:
 *     summary: Yangi region yaratish
 *     tags: [Region]
 *     description: Yangi region yaratish
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
router.post("/create", postRegion);

/**
 * @swagger
 * /region/search:
 *   get:
 *     summary: Region bo'yicha qidirish
 *     tags: [Region]
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
router.get("/search", searchRegion);

/**
 * @swagger
 * /region/get:
 *   get:
 *     summary: Barcha regionlarni olish
 *     tags: [Region]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getRegions);

/**
 * @swagger
 * /region/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Region]
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
router.get("/getById/:id", getRegionById);

/**
 * @swagger
 * /region/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Region]
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
router.put("/update/:id", updateRegion);

/**
 * @swagger
 * /region/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Region]
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
router.delete("/delete/:id", deleteRegion);

module.exports = router;
