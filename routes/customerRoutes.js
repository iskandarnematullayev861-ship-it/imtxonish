const { Router } = require("express");
const {
  postCustomer,
  searchCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
} = require("../controllers/customer.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: Customer uchun API endpointlari
 */

/**
 * @swagger
 * /customer/create:
 *   post:
 *     summary: Yangi customer yaratish
 *     tags: [Customer]
 *     description: Yangi customer yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCustomer);

/**
 * @swagger
 * /customer/search:
 *   get:
 *     summary: Customer bo'yicha qidirish
 *     tags: [Customer]
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
router.get("/search", searchCustomer);

/**
 * @swagger
 * /customer/get:
 *   get:
 *     summary: Barcha customerlarni olish
 *     tags: [Customer]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCustomers);

/**
 * @swagger
 * /customer/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Customer]
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
router.get("/getById/:id", getCustomerById);

/**
 * @swagger
 * /customer/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Customer]
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
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
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
router.put("/update/:id", updateCustomer);

/**
 * @swagger
 * /customer/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Customer]
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
router.delete("/delete/:id", deleteCustomer);

module.exports = router;
