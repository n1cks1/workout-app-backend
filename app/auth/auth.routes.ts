import express,  {type Router} from "express";
import {loginUser, registerUser} from "./auth.controller.js";

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)

export default router