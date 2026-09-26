const { Router } = require("express");
const {
  postEventType,
  searchEventType,
  getEventTypes,
  updateEventType,
  deleteEventType,
  getEventTypeById,
} = require("../controllers/event_type.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: EventType
 *   description: EventType uchun API endpointlari
 */

/**
 * @swagger
 * /event_type/create:
 *   post:
 *     summary: Yangi event_type yaratish
 *     tags: [EventType]
 *     description: Yangi event_type yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parent_event_type_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postEventType);

/**
 * @swagger
 * /event_type/search:
 *   get:
 *     summary: EventType bo'yicha qidirish
 *     tags: [EventType]
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
router.get("/search", searchEventType);

/**
 * @swagger
 * /event_type/get:
 *   get:
 *     summary: Barcha event_typelarni olish
 *     tags: [EventType]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getEventTypes);

/**
 * @swagger
 * /event_type/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [EventType]
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
router.get("/getById/:id", getEventTypeById);

/**
 * @swagger
 * /event_type/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [EventType]
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
 *               parent_event_type_id:
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
router.put("/update/:id", updateEventType);

/**
 * @swagger
 * /event_type/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [EventType]
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
router.delete("/delete/:id", deleteEventType);

module.exports = router;
