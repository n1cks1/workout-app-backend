import express from "express";
import {getProfile} from "./user.controller";
import {protect} from "../middleware/auth.middleware";

const router = express.Router()

router.get("/profile", protect, getProfile)

export default router