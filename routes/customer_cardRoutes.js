const { Router } = require("express");
const {
  postCustomerCard,
  searchCustomerCard,
  getCustomerCards,
  updateCustomerCard,
  deleteCustomerCard,
  getCustomerCardById,
} = require("../controllers/customer_card.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: CustomerCard
 *   description: CustomerCard uchun API endpointlari
 */

/**
 * @swagger
 * /customer_card/create:
 *   post:
 *     summary: Yangi customer_card yaratish
 *     tags: [CustomerCard]
 *     description: Yangi customer_card yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCustomerCard);

/**
 * @swagger
 * /customer_card/search:
 *   get:
 *     summary: CustomerCard bo'yicha qidirish
 *     tags: [CustomerCard]
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
router.get("/search", searchCustomerCard);

/**
 * @swagger
 * /customer_card/get:
 *   get:
 *     summary: Barcha customer_cardlarni olish
 *     tags: [CustomerCard]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCustomerCards);

/**
 * @swagger
 * /customer_card/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [CustomerCard]
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
router.get("/getById/:id", getCustomerCardById);

/**
 * @swagger
 * /customer_card/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [CustomerCard]
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
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               number:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_main:
 *                 type: boolean
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
router.put("/update/:id", updateCustomerCard);

/**
 * @swagger
 * /customer_card/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [CustomerCard]
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
router.delete("/delete/:id", deleteCustomerCard);

module.exports = router;
