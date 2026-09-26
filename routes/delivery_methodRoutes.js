const { Router } = require("express");
const {
  postDeliveryMethod,
  searchDeliveryMethod,
  getDeliveryMethods,
  updateDeliveryMethod,
  deleteDeliveryMethod,
  getDeliveryMethodById,
} = require("../controllers/delivery_method.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: DeliveryMethod
 *   description: DeliveryMethod uchun API endpointlari
 */

/**
 * @swagger
 * /delivery_method/create:
 *   post:
 *     summary: Yangi delivery_method yaratish
 *     tags: [DeliveryMethod]
 *     description: Yangi delivery_method yaratish
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
router.post("/create", postDeliveryMethod);

/**
 * @swagger
 * /delivery_method/search:
 *   get:
 *     summary: DeliveryMethod bo'yicha qidirish
 *     tags: [DeliveryMethod]
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
router.get("/search", searchDeliveryMethod);

/**
 * @swagger
 * /delivery_method/get:
 *   get:
 *     summary: Barcha delivery_methodlarni olish
 *     tags: [DeliveryMethod]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getDeliveryMethods);

/**
 * @swagger
 * /delivery_method/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [DeliveryMethod]
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
router.get("/getById/:id", getDeliveryMethodById);

/**
 * @swagger
 * /delivery_method/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [DeliveryMethod]
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
router.put("/update/:id", updateDeliveryMethod);

/**
 * @swagger
 * /delivery_method/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [DeliveryMethod]
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
router.delete("/delete/:id", deleteDeliveryMethod);

module.exports = router;
