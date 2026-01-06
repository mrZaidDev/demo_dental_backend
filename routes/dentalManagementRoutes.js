import express from "express";
const Router = express.Router();
import authMiddleware from "../middlewares/authmiddleware.js";

import { createPatient, deletePatient, getAllPatients, getSinglePatient, updatePatient } from "../controllers/dentalManagementController.js";

// Create patient dental route
Router.post("/create-patient", authMiddleware, createPatient);

// Get single patient route
Router.get("/patient/:id", authMiddleware, getSinglePatient);

// Get all patients route
Router.get("/patients", authMiddleware, getAllPatients);

// Update patient route
Router.put("/update-patient/:id", authMiddleware, updatePatient);

// Delete patient route
Router.delete("/delete-patient/:id", authMiddleware, deletePatient);

export default Router;
