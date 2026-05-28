import express from "express";
import {getProfile} from "./user.controller";
import {protect} from "../middleware/auth.middleware";

const router = express.Router()

/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Получить профиль пользователя
 *     description: Возвращает данные пользователя и статистику тренировок
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "clx123abc"
 *                 email:
 *                   type: string
 *                   example: "user@mail.com"
 *                 name:
 *                   type: string
 *                   example: "John"
 *                 statistics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "minutes"
 *                       value:
 *                         type: number
 *                         example: 120
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Пользователь не найден
 */
router.get("/profile", protect, getProfile)
export default router