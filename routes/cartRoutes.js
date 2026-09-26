const { Router } = require("express");
const {
  postCart,
  searchCart,
  getCarts,
  updateCart,
  deleteCart,
  getCartById,
} = require("../controllers/cart.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart uchun API endpointlari
 */

/**
 * @swagger
 * /cart/create:
 *   post:
 *     summary: Yangi cart yaratish
 *     tags: [Cart]
 *     description: Yangi cart yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *               status_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCart);

/**
 * @swagger
 * /cart/search:
 *   get:
 *     summary: Cart bo'yicha qidirish
 *     tags: [Cart]
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
router.get("/search", searchCart);

/**
 * @swagger
 * /cart/get:
 *   get:
 *     summary: Barcha cartlarni olish
 *     tags: [Cart]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCarts);

/**
 * @swagger
 * /cart/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Cart]
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
router.get("/getById/:id", getCartById);

/**
 * @swagger
 * /cart/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Cart]
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
 *               customer_id:
 *                 type: string
 *               finishedAt:
 *                 type: string
 *               status_id:
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
router.put("/update/:id", updateCart);

/**
 * @swagger
 * /cart/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Cart]
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
router.delete("/delete/:id", deleteCart);

module.exports = router;
