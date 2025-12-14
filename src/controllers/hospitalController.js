const pool = require("../db");

exports.addHospital = async (req, res) => {
  try {
    const { name, location } = req.body;
    const result = await pool.query(
      "INSERT INTO hospitals (name, location) VALUES ($1, $2) RETURNING *",
      [name, location]
    );
    res.json({
      message: "Hospital added successfully",
      hospital: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getHospitals = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM hospitals");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
