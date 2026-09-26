const { Router } = require("express");
const {
  postSector,
  searchSector,
  getSectors,
  updateSector,
  deleteSector,
  getSectorById,
} = require("../controllers/sector.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sector
 *   description: Sector uchun API endpointlari
 */

/**
 * @swagger
 * /sector/create:
 *   post:
 *     summary: Yangi sector yaratish
 *     tags: [Sector]
 *     description: Yangi sector yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postSector);

/**
 * @swagger
 * /sector/search:
 *   get:
 *     summary: Sector bo'yicha qidirish
 *     tags: [Sector]
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
router.get("/search", searchSector);

/**
 * @swagger
 * /sector/get:
 *   get:
 *     summary: Barcha sectorlarni olish
 *     tags: [Sector]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getSectors);

/**
 * @swagger
 * /sector/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Sector]
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
router.get("/getById/:id", getSectorById);

/**
 * @swagger
 * /sector/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Sector]
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
 *               sector_name:
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
router.put("/update/:id", updateSector);

/**
 * @swagger
 * /sector/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Sector]
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
router.delete("/delete/:id", deleteSector);

module.exports = router;
