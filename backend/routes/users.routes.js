import express, { Router } from "express";
import protectRoute from "../middleware/protectedRoute.js";
import { getAllUsers } from "../controllers/users.controller.js";

const router = express.Router();

router.get('/', protectRoute , getAllUsers)

export default router