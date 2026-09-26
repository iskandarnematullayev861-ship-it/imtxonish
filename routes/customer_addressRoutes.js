const { Router } = require("express");
const {
  postCustomerAddress,
  searchCustomerAddress,
  getCustomerAddresses,
  updateCustomerAddress,
  deleteCustomerAddress,
  getCustomerAddressById,
} = require("../controllers/customer_address.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: CustomerAddress
 *   description: CustomerAddress uchun API endpointlari
 */

/**
 * @swagger
 * /customer_address/create:
 *   post:
 *     summary: Yangi customer_address yaratish
 *     tags: [CustomerAddress]
 *     description: Yangi customer_address yaratish
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: string
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Muvaffaqiyatli yaratildi
 *       '400':
 *         description: Yomon so'rov, validatsiya xatosi
 *       '500':
 *         description: Ichki server xatosi
 */
router.post("/create", postCustomerAddress);

/**
 * @swagger
 * /customer_address/search:
 *   get:
 *     summary: CustomerAddress bo'yicha qidirish
 *     tags: [CustomerAddress]
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
router.get("/search", searchCustomerAddress);

/**
 * @swagger
 * /customer_address/get:
 *   get:
 *     summary: Barcha customer_addresslarni olish
 *     tags: [CustomerAddress]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getCustomerAddresses);

/**
 * @swagger
 * /customer_address/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [CustomerAddress]
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
router.get("/getById/:id", getCustomerAddressById);

/**
 * @swagger
 * /customer_address/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [CustomerAddress]
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
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *               street:
 *                 type: string
 *               house:
 *                 type: string
 *               flat_id:
 *                 type: string
 *               location:
 *                 type: string
 *               post_index:
 *                 type: string
 *               info:
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
router.put("/update/:id", updateCustomerAddress);

/**
 * @swagger
 * /customer_address/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [CustomerAddress]
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
router.delete("/delete/:id", deleteCustomerAddress);

module.exports = router;
