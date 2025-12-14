const pool = require("../db");

exports.allocateBed = async (req, res) => {
  try {
    const { patient_id, hospital_id } = req.body;

    // 1️⃣ Check patient exists
    const patientRes = await pool.query(
      "SELECT * FROM patients WHERE id = $1",
      [patient_id]
    );

    if (patientRes.rows.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const patient = patientRes.rows[0];

    // 2️⃣ Decide bed priority based on patient condition
    let preferredBeds = [];

    if (patient.condition === "CRITICAL") {
      preferredBeds = ["ICU", "GENERAL"];
    } else {
      preferredBeds = ["GENERAL"];
    }

    // 3️⃣ Try allocating bed in the same hospital
    for (let bedType of preferredBeds) {
      const bedRes = await pool.query(
        `SELECT * FROM beds
         WHERE hospital_id = $1 AND type = $2 AND available_count > 0
         LIMIT 1`,
        [hospital_id, bedType]
      );

      if (bedRes.rows.length > 0) {
        const bed = bedRes.rows[0];

        // Allocate bed
        await pool.query(
          "UPDATE beds SET available_count = available_count - 1 WHERE id = $1",
          [bed.id]
        );

        return res.status(200).json({
          message: "Bed allocated successfully",
          bed_type: bedType,
          hospital_id,
          patient_condition: patient.condition,
        });
      }
    }

    // 4️⃣ If no beds available → find nearest hospital
    const nearestRes = await pool.query(
      `SELECT h.id, h.name, h.location, b.type
       FROM hospitals h
       JOIN beds b ON h.id = b.hospital_id
       WHERE b.type = ANY($1) AND b.available_count > 0
       LIMIT 1`,
      [preferredBeds]
    );

    if (nearestRes.rows.length > 0) {
      const h = nearestRes.rows[0];
      return res.status(200).json({
        message: `No beds available in this hospital. Nearest hospital with available bed found.`,
        hospital: h.name,
        location: h.location,
        bed_type: h.type,
      });
    }

    // 5️⃣ No beds anywhere
    return res.status(200).json({
      message: "No beds available anywhere for this patient",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Optional: get all allocations (if you add allocations table later)
exports.getAllAllocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM allocations");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
