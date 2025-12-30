import express from "express";
const Router = express.Router();
import authMiddleware from "../middlewares/authmiddleware.js";
import Patient from "../models/PatientModel.js";

// Create patient dental route
Router.post("/create-patient", authMiddleware, async (req, res) => {
  const { Name, PhoneNumber, details, total, advance } = req.body;
  if (!Name || !PhoneNumber || !details || !total || !advance) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const newPatient = new Patient({
      Name,
      PhoneNumber,
      details,
      total,
      advance,
    });
    const savedPatient = await newPatient.save();
    res
      .status(201)
      .json({ message: "Patient created successfully", patient: savedPatient });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single patient route
Router.get("/patient/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    res.status(200).json({ message: "Got the patient", patient });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all patients route
Router.get("/patients", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, patients });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update patient route
Router.put("/update-patient/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const ShouldChangeValues = req.body;
  try {
    const findPatient = await Patient.findById(id);
    if (!findPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    const updatePatient = await Patient.findByIdAndUpdate(
      id,
      ShouldChangeValues
    );
    res.status(200).json({
      message: "patient updated successfully",
      patient: updatePatient,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete patient route
Router.delete("/delete-patient/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const findPatient = await Patient.findById(id);
    if (!findPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    await Patient.findByIdAndDelete(id);
    res.status(200).json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default Router;
