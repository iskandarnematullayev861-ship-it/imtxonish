const { Router } = require("express");
const {
  postCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  getCartItemById,
} = require("../controllers/cart_item.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: CartItem
 *   description: CartItem uchun API endpointlari
 */

/**
 * @swagger
 * /cart_item/create:
 *   post:
 *     summary: Yangi cart_item yaratish
 *     tags: [CartItem]
 *     description: Yangi cart_item yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: string
 *               cart_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCartItem);



/**
 * @swagger
 * /cart_item/get:
 *   get:
 *     summary: Barcha cart_itemlarni olish
 *     tags: [CartItem]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCartItems);

/**
 * @swagger
 * /cart_item/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [CartItem]
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
router.get("/getById/:id", getCartItemById);

/**
 * @swagger
 * /cart_item/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [CartItem]
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
 *               ticket_id:
 *                 type: string
 *               cart_id:
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
router.put("/update/:id", updateCartItem);

/**
 * @swagger
 * /cart_item/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [CartItem]
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
router.delete("/delete/:id", deleteCartItem);

module.exports = router;
