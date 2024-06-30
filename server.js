const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/student');

const app = express();
const PORT = 5000; // Choose your preferred port

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
  const HOD = mongoose.model('HOD', hodSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://cp1:cp1@cp1.7vpcddf.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
// Route to add a new student
app.post('/api/students', async (req, res) => {
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
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/hods', async (req, res) => {
    try {
      const hods = await HOD.find();
      res.json(hods);
    } catch (error) {
      console.error('Error fetching HODs:', error);
      res.status(500).json({ error: 'Failed to fetch HODs' });
    }
  });

  app.post('/api/hods', async (req, res) => {
    try {
      const newHOD = await HOD.create(req.body);
      res.status(201).json(newHOD);
    } catch (error) {
      console.error('Error adding HOD:', error);
      res.status(500).json({ error: 'Failed to add HOD' });
    }
  });

  app.delete('/api/hods/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await HOD.findByIdAndDelete(id);
      res.status(200).json({ message: 'HOD deleted successfully' });
    } catch (error) {
      console.error('Error deleting HOD:', error);
      res.status(500).json({ error: 'Failed to delete HOD' });
    }
  });

  const companySchema = new mongoose.Schema({
    companyName: String,
    address: String,
    website: String,
    phone: String,
    email: String,
  });
  const Company = mongoose.model('Company', companySchema);

  // Middleware
  app.use(bodyParser.json());

  // Routes
  app.get('/api/companies', async (req, res) => {
    try {
      const companies = await Company.find();
      res.json(companies);
    } catch (error) {
      console.error('Error fetching companies:', error);
      res.status(500).json({ error: 'Failed to fetch companies' });
    }
  });

  app.post('/api/companies', async (req, res) => {
    try {
      const newCompany = await Company.create(req.body);
      res.status(201).json(newCompany);
    } catch (error) {
      console.error('Error adding company:', error);
      res.status(500).json({ error: 'Failed to add company' });
    }
  });

  app.delete('/api/companies/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Company.findByIdAndDelete(id);
      res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
      console.error('Error deleting company:', error);
      res.status(500).json({ error: 'Failed to delete company' });
    }
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
