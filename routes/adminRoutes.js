const { Router } = require("express");
const {
  postAdmin,
  searchAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getAdminById,
} = require("../controllers/admin.controller");

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin uchun API endpointlari
 */

/**
 * @swagger
 * /admin/create:
 *   post:
 *     summary: Yangi admin yaratish
 *     tags: [Admin]
 *     description: Yangi admin yaratish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
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
router.post("/create", postAdmin);

/**
 * @swagger
 * /admin/search:
 *   get:
 *     summary: Admin bo'yicha qidirish
 *     tags: [Admin]
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
router.get("/search", searchAdmin);

/**
 * @swagger
 * /admin/get:
 *   get:
 *     summary: Barcha adminlarni olish
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Muvaffaqiyatli olindi
 *       '500':
 *         description: Ichki server xatosi
 */
router.get("/get", getAdmins);

/**
 * @swagger
 * /admin/getById/{id}:
 *   get:
 *     summary: ID bo'yicha olish
 *     tags: [Admin]
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
router.get("/getById/:id", getAdminById);

/**
 * @swagger
 * /admin/update/{id}:
 *   put:
 *     summary: Tahrirlash
 *     tags: [Admin]
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
 *               login:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               is_creator:
 *                 type: boolean
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
router.put("/update/:id", updateAdmin);

/**
 * @swagger
 * /admin/delete/{id}:
 *   delete:
 *     summary: O'chirish
 *     tags: [Admin]
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
router.delete("/delete/:id", deleteAdmin);

module.exports = router;
