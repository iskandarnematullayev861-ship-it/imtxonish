const { Router } = require("express");
const {
  postVenuePhoto,
  searchVenuePhoto,
  getVenuePhotos,
  updateVenuePhoto,
  deleteVenuePhoto,
  getVenuePhotoById,
} = require("../controllers/venue_photo.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: VenuePhoto
 *   description: VenuePhoto uchun API endpointlari
 */

/**
 * @swagger
 * /venue_photo/create:
 *   post:
 *     summary: Yangi venue_photo yaratish
 *     tags: [VenuePhoto]
 *     description: Yangi venue_photo yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               venueId:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postVenuePhoto);

/**
 * @swagger
 * /venue_photo/search:
 *   get:
 *     summary: VenuePhoto bo'yicha qidirish
 *     tags: [VenuePhoto]
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
router.get("/search", searchVenuePhoto);

/**
 * @swagger
 * /venue_photo/get:
 *   get:
 *     summary: Barcha venue_photolarni olish
 *     tags: [VenuePhoto]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getVenuePhotos);

/**
 * @swagger
 * /venue_photo/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [VenuePhoto]
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
router.get("/getById/:id", getVenuePhotoById);

/**
 * @swagger
 * /venue_photo/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [VenuePhoto]
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
 *               url:
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
router.put("/update/:id", updateVenuePhoto);

/**
 * @swagger
 * /venue_photo/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [VenuePhoto]
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
router.delete("/delete/:id", deleteVenuePhoto);

module.exports = router;
