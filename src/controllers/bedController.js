const pool = require("../db");

exports.addBed = async (req, res) => {
  try {
    const { hospital_id, type, available_count } = req.body;
    const result = await pool.query(
      "INSERT INTO beds (hospital_id, type, available_count) VALUES ($1, $2, $3) RETURNING *",
      [hospital_id, type, available_count]
    );
    res.json({ message: "Bed added successfully", bed: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getBeds = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM beds");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
