const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
require("dotenv").config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

// Middleware
app.use(bodyParser.json());

const hodSchema = new mongoose.Schema({
  name: String,
  address: String,
  gender: String,
  department: String,
  phone: String,
  email: String,
});
const HOD = mongoose.model("HOD", hodSchema);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes

app.get("/", (req, res) => {
  res.send("Server in Running.......");
});

// Route to add a new student
app.post("/api/students", async (req, res) => {
  const { name, address, gender, dob, phone, branch } = req.body;
  try {
    const student = new Student({ name, address, gender, dob, phone, branch });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to fetch all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// HOD Routes
app.get("/api/hods", async (req, res) => {
  try {
    const hods = await HOD.find();
    res.json(hods);
  } catch (error) {
    console.error("Error fetching HODs:", error);
    res.status(500).json({ error: "Failed to fetch HODs" });
  }
});

app.post("/api/hods", async (req, res) => {
  try {
    const newHOD = await HOD.create(req.body);
    res.status(201).json(newHOD);
  } catch (error) {
    console.error("Error adding HOD:", error);
    res.status(500).json({ error: "Failed to add HOD" });
  }
});

app.delete("/api/hods/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await HOD.findByIdAndDelete(id);
    res.status(200).json({ message: "HOD deleted successfully" });
  } catch (error) {
    console.error("Error deleting HOD:", error);
    res.status(500).json({ error: "Failed to delete HOD" });
  }
});

// Company Schema and Routes
const companySchema = new mongoose.Schema({
  companyName: String,
  address: String,
  website: String,
  phone: String,
  email: String,
});
const Company = mongoose.model("Company", companySchema);

app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
});

app.post("/api/companies", async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error("Error adding company:", error);
    res.status(500).json({ error: "Failed to add company" });
  }
});

app.delete("/api/companies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Failed to delete company" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
