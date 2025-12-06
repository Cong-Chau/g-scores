const { Score } = require("../models");

exports.checkScore = async (req, res) => {
  try {
    const { registrationNumber } = req.params;

    const scores = await Score.findAll({ where: { registrationNumber } });

    if (!scores.length) {
      return res.status(404).json({ message: "No result found" });
    }

    return res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reportLevels = async (req, res) => {
  try {
    const Sequelize = require("sequelize");
    const { Score } = require("../models");

    // lấy tên cột từ query, ví dụ: math, physics, biology...
    const subject = req.params.subject;

    if (!subject) {
      return res.status(400).json({ error: "Missing subject parameter" });
    }

    // kiểm tra subject có tồn tại trong model không
    const validSubjects = [
      "math",
      "literature",
      "foreignLanguage",
      "physics",
      "chemistry",
      "biology",
      "history",
      "geography",
      "civicEducation",
    ];

    if (!validSubjects.includes(subject)) {
      return res.status(400).json({ error: "Invalid subject column" });
    }

    // build SQL dynamically
    const levelA = await Score.count({
      where: Sequelize.literal(`${subject} >= 8`),
    });

    const levelB = await Score.count({
      where: Sequelize.literal(`${subject} < 8 AND ${subject} >= 6`),
    });

    const levelC = await Score.count({
      where: Sequelize.literal(`${subject} < 6 AND ${subject} >= 4`),
    });

    const levelD = await Score.count({
      where: Sequelize.literal(`${subject} < 4`),
    });

    res.json({
      subject,
      levelA,
      levelB,
      levelC,
      levelD,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.topGroupA = async (req, res) => {
  const { Score } = require("../models");
  const Sequelize = require("sequelize");

  try {
    const results = await Score.findAll({
      attributes: [
        "registrationNumber",
        [Sequelize.literal("math + physics + chemistry"), "totalScore"],
      ],
      order: [[Sequelize.literal("totalScore"), "DESC"]],
      limit: 10,
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
