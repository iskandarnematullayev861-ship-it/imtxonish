const { Router } = require("express");
const {
  postEvent,
  searchEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventById,
} = require("../controllers/event.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Event uchun API endpointlari
 */

/**
 * @swagger
 * /event/create:
 *   post:
 *     summary: Yangi event yaratish
 *     tags: [Event]
 *     description: Yangi event yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postEvent);

/**
 * @swagger
 * /event/search:
 *   get:
 *     summary: Event bo'yicha qidirish
 *     tags: [Event]
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
router.get("/search", searchEvent);

/**
 * @swagger
 * /event/get:
 *   get:
 *     summary: Barcha eventlarni olish
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getEvents);

/**
 * @swagger
 * /event/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Event]
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
router.get("/getById/:id", getEventById);

/**
 * @swagger
 * /event/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Event]
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
 *               photo:
 *                 type: string
 *               start_date:
 *                 type: string
 *               start_time:
 *                 type: string
 *               finish_date:
 *                 type: string
 *               finish_time:
 *                 type: string
 *               info:
 *                 type: string
 *               event_type_id:
 *                 type: string
 *               human_category_id:
 *                 type: string
 *               venue_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               release_date:
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
router.put("/update/:id", updateEvent);

/**
 * @swagger
 * /event/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Event]
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
router.delete("/delete/:id", deleteEvent);

module.exports = router;
