import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getAdmin, getCurrentUser } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRoutes = express.Router();

userRoutes.get("/getCurrentUser", isAuth, getCurrentUser);


userRoutes.get("/getAdmin", adminAuth, getAdmin);

export default userRoutes;
