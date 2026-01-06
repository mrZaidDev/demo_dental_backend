import express from "express";
const Router = express.Router();
import authMiddleware from "../middlewares/authmiddleware.js";
import { login, logout, verify } from "../controllers/authController.js";


Router.get("/verify", authMiddleware,verify);

Router.post("/login", login);

Router.post("/logout", logout );

export default Router;
