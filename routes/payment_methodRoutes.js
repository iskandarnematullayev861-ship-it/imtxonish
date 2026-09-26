const { Router } = require("express");
const {
  postPaymentMethod,
  searchPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
} = require("../controllers/payment_method.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PaymentMethod
 *   description: PaymentMethod uchun API endpointlari
 */

/**
 * @swagger
 * /payment_method/create:
 *   post:
 *     summary: Yangi payment_method yaratish
 *     tags: [PaymentMethod]
 *     description: Yangi payment_method yaratish
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
router.post("/create", postPaymentMethod);

/**
 * @swagger
 * /payment_method/search:
 *   get:
 *     summary: PaymentMethod bo'yicha qidirish
 *     tags: [PaymentMethod]
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
router.get("/search", searchPaymentMethod);

/**
 * @swagger
 * /payment_method/get:
 *   get:
 *     summary: Barcha payment_methodlarni olish
 *     tags: [PaymentMethod]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getPaymentMethods);

/**
 * @swagger
 * /payment_method/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [PaymentMethod]
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
router.get("/getById/:id", getPaymentMethodById);

/**
 * @swagger
 * /payment_method/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [PaymentMethod]
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
router.put("/update/:id", updatePaymentMethod);

/**
 * @swagger
 * /payment_method/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [PaymentMethod]
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
router.delete("/delete/:id", deletePaymentMethod);

module.exports = router;
