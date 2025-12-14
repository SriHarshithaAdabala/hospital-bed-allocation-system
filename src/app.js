const express = require("express");
require("dotenv").config();

const hospitalRoutes = require("./routes/hospitalRoutes");
const patientRoutes = require("./routes/patientRoutes");
const bedRoutes = require("./routes/bedRoutes");
const allocationRoutes = require("./routes/allocationRoutes");

const app = express();
app.use(express.json());

app.use("/hospitals", hospitalRoutes);
app.use("/patients", patientRoutes);
app.use("/beds", bedRoutes);
app.use("/allocate", allocationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
