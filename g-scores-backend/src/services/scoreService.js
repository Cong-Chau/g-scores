const { Score } = require("../models");
const Sequelize = require("sequelize");

exports.getScoresPaginated = async ({ limit, offset }) => {
  return await Score.findAndCountAll({
    limit,
    offset,
    order: [["registrationNumber", "ASC"]],
  });
};

exports.checkScore = async (registrationNumber) => {
  return await Score.findAll({ where: { registrationNumber } });
};

exports.reportLevels = async (subject) => {
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
    throw new Error("Invalid subject column");
  }

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

  return { subject, levelA, levelB, levelC, levelD };
};

exports.topGroupA = async () => {
  return await Score.findAll({
    attributes: [
      "registrationNumber",
      [Sequelize.literal("math + physics + chemistry"), "totalScore"],
    ],
    order: [[Sequelize.literal("totalScore"), "DESC"]],
    limit: 10,
  });
};
