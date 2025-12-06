"use strict";

const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  async up(queryInterface) {
    console.log("⏳ Fetching CSV...");

    const csvUrl =
      "https://raw.githubusercontent.com/GoldenOwlAsia/webdev-intern-assignment-3/refs/heads/main/dataset/diem_thi_thpt_2024.csv";

    const response = await fetch(csvUrl);
    const csvText = await response.text();

    const tempPath = path.resolve("temp_scores.csv");
    fs.writeFileSync(tempPath, csvText);

    const CHUNK_SIZE = 2000;
    let buffer = [];
    let totalInserted = 0;

    const fix = (v) => {
      if (v === undefined || v === null || v === "") return null;
      const num = parseFloat(v);
      return isNaN(num) ? null : num;
    };

    const expectedKeys = [
      "sbd",
      "toan",
      "ngu_van",
      "ngoai_ngu",
      "vat_li",
      "hoa_hoc",
      "sinh_hoc",
      "lich_su",
      "dia_li",
      "gdcd",
      "ma_ngoai_ngu",
    ];

    const isValidRow = (row) => {
      if (!row.sbd || row.sbd.trim() === "") return false;
      for (const key of expectedKeys) {
        if (!(key in row)) return false;
      }
      return true;
    };

    console.log("⏳ Processing CSV & inserting...");

    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(tempPath).pipe(csvParser());

      stream.on("data", (row) => {
        if (!isValidRow(row)) {
          console.warn("⚠️ Skipped invalid row:", row);
          return;
        }

        buffer.push({
          registrationNumber: row.sbd,
          math: fix(row.toan),
          literature: fix(row.ngu_van),
          foreignLanguage: fix(row.ngoai_ngu),
          physics: fix(row.vat_li),
          chemistry: fix(row.hoa_hoc),
          biology: fix(row.sinh_hoc),
          history: fix(row.lich_su),
          geography: fix(row.dia_li),
          civicEducation: fix(row.gdcd),
          foreignLanguageCode: row.ma_ngoai_ngu || null,
          created_at: new Date(),
          updated_at: new Date(),
        });

        if (buffer.length >= CHUNK_SIZE) {
          stream.pause();

          queryInterface
            .bulkInsert("scores", buffer)
            .then(() => {
              totalInserted += buffer.length;
              console.log(`Inserted ${totalInserted} rows...`);
              buffer = [];
              stream.resume();
            })
            .catch(reject);
        }
      });

      stream.on("end", () => {
        if (buffer.length > 0) {
          queryInterface
            .bulkInsert("scores", buffer)
            .then(() => {
              totalInserted += buffer.length;
              console.log(`Inserted ${totalInserted} rows (final).`);
              resolve();
            })
            .catch(reject);
        } else {
          resolve();
        }
      });

      stream.on("error", reject);
    });

    fs.unlinkSync(tempPath);

    console.log("🎉 DONE — Total inserted:", totalInserted);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("scores", null, {});
  },
};
