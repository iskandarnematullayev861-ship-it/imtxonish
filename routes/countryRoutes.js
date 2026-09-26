const { Router } = require("express");
const {
  postCountry,
  searchCountry,
  getCountries,
  updateCountry,
  deleteCountry,
  getCountryById,
} = require("../controllers/country.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Country
 *   description: Country uchun API endpointlari
 */

/**
 * @swagger
 * /country/create:
 *   post:
 *     summary: Yangi country yaratish
 *     tags: [Country]
 *     description: Yangi country yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCountry);

/**
 * @swagger
 * /country/search:
 *   get:
 *     summary: Country bo'yicha qidirish
 *     tags: [Country]
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
router.get("/search", searchCountry);

/**
 * @swagger
 * /country/get:
 *   get:
 *     summary: Barcha countrylarni olish
 *     tags: [Country]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCountries);

/**
 * @swagger
 * /country/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Country]
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
router.get("/getById/:id", getCountryById);

/**
 * @swagger
 * /country/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Country]
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
 *               country_name:
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
router.put("/update/:id", updateCountry);

/**
 * @swagger
 * /country/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Country]
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
router.delete("/delete/:id", deleteCountry);

module.exports = router;
