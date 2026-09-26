const { Router } = require("express");
const {
  postVenue,
  searchVenue,
  getVenues,
  updateVenue,
  deleteVenue,
  getVenueById,
} = require("../controllers/venue.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Venue
 *   description: Venue uchun API endpointlari
 */

/**
 * @swagger
 * /venue/create:
 *   post:
 *     summary: Yangi venue yaratish
 *     tags: [Venue]
 *     description: Yangi venue yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postVenue);

/**
 * @swagger
 * /venue/search:
 *   get:
 *     summary: Venue bo'yicha qidirish
 *     tags: [Venue]
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
router.get("/search", searchVenue);

/**
 * @swagger
 * /venue/get:
 *   get:
 *     summary: Barcha venuelarni olish
 *     tags: [Venue]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getVenues);

/**
 * @swagger
 * /venue/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Venue]
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
router.get("/getById/:id", getVenueById);

/**
 * @swagger
 * /venue/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Venue]
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
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
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
router.put("/update/:id", updateVenue);

/**
 * @swagger
 * /venue/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Venue]
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
router.delete("/delete/:id", deleteVenue);

module.exports = router;
