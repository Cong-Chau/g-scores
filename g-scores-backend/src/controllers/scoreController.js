const scoreService = require("../services/scoreService");

exports.getScoresPaginated = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    const { rows, count } = await scoreService.getScoresPaginated({
      limit,
      offset,
    });

    return res.json({
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
      items: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkScore = async (req, res) => {
  try {
    const { registrationNumber } = req.params;
    const data = await scoreService.checkScore(registrationNumber);

    if (!data.length) {
      return res.status(404).json({ message: "No result found" });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reportLevels = async (req, res) => {
  try {
    const { subject } = req.params;
    const result = await scoreService.reportLevels(subject);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.topGroupA = async (req, res) => {
  try {
    const results = await scoreService.topGroupA();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
