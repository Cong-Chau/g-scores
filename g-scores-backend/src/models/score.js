"use strict";

module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    "Score",
    {
      registrationNumber: {
        type: DataTypes.STRING,
        field: "registrationNumber",
      },
      math: {
        type: DataTypes.FLOAT,
        field: "math",
      },
      literature: {
        type: DataTypes.FLOAT,
        field: "literature",
      },
      foreignLanguage: {
        type: DataTypes.FLOAT,
        field: "foreignLanguage",
      },
      physics: {
        type: DataTypes.FLOAT,
        field: "physics",
      },
      chemistry: {
        type: DataTypes.FLOAT,
        field: "chemistry",
      },
      biology: {
        type: DataTypes.FLOAT,
        field: "biology",
      },
      history: {
        type: DataTypes.FLOAT,
        field: "history",
      },
      geography: {
        type: DataTypes.FLOAT,
        field: "geography",
      },
      civicEducation: {
        type: DataTypes.FLOAT,
        field: "civicEducation",
      },
      foreignLanguageCode: {
        type: DataTypes.STRING,
        field: "foreignLanguageCode",
      },
    },
    {
      tableName: "scores",
      timestamps: true,
      underscored: true,
    }
  );

  return Score;
};
