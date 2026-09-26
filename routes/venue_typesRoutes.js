const { Router } = require("express");
const {
  postVenueTypes,
  getVenueTypesList,
  updateVenueTypes,
  deleteVenueTypes,
  getVenueTypesById,
} = require("../controllers/venue_types.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VenueTypes
 *   description: VenueTypes uchun API endpointlari
 */

/**
 * @swagger
 * /venue_types/create:
 *   post:
 *     summary: Yangi venue_types yaratish
 *     tags: [VenueTypes]
 *     description: Yangi venue_types yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postVenueTypes);

/**
 * @swagger
 * /venue_types/get:
 *   get:
 *     summary: Barcha venue_typeslarni olish
 *     tags: [VenueTypes]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getVenueTypesList);

/**
 * @swagger
 * /venue_types/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [VenueTypes]
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
router.get("/getById/:id", getVenueTypesById);

/**
 * @swagger
 * /venue_types/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [VenueTypes]
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
 *               venueId:
 *                 type: string
 *               typeId:
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
router.put("/update/:id", updateVenueTypes);

/**
 * @swagger
 * /venue_types/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [VenueTypes]
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
router.delete("/delete/:id", deleteVenueTypes);

module.exports = router;
