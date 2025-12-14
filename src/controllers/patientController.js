const pool = require("../db");

exports.addPatient = async (req, res) => {
  try {
    const { name, condition } = req.body; // removed age
    const result = await pool.query(
      "INSERT INTO patients (name, condition) VALUES ($1, $2) RETURNING *",
      [name, condition]
    );
    res.json({
      message: "Patient added successfully",
      patient: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
