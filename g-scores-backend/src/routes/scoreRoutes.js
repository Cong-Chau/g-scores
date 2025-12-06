const express = require("express");
const router = express.Router();
const controller = require("../controllers/scoreController");

/**
 * @swagger
 * tags:
 *   name: Scores
 *   description: API tra cứu và thống kê điểm
 */

/**
 * @swagger
 * /api/scores/check/{registrationNumber}:
 *   get:
 *     summary: Tra cứu điểm theo số báo danh
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: registrationNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Số báo danh của thí sinh
 *     responses:
 *       200:
 *         description: Lấy điểm thành công
 *       404:
 *         description: Không tìm thấy thí sinh
 */
router.get("/check/:registrationNumber", controller.checkScore);

/**
 * @swagger
 * /api/scores/report/{subject}:
 *   get:
 *     summary: Báo cáo số lượng thí sinh theo môn học
 *     tags: [Scores]
 *     parameters:
 *       - in: path
 *         name: subject
 *         required: true
 *         schema:
 *           type: string
 *           example: math
 *         description: Tên môn học
 *     responses:
 *       200:
 *         description: Thành công
 */

router.get("/report/:subject", controller.reportLevels);

/**
 * @swagger
 * /api/scores/top-group-a:
 *   get:
 *     summary: Lấy top 10 thí sinh khối A (Toán + Lý + Hóa)
 *     tags: [Scores]
 *     responses:
 *       200:
 *         description: Trả về danh sách top 10
 */
router.get("/top-group-a", controller.topGroupA);

module.exports = router;
