import express from "express";
import {protect} from "../middleware/auth.middleware";
import {createWorkout, deleteWorkout, getWorkouts, updateWorkout} from "./workout.controller";
import {createNewWorkoutLog} from "./log/workout-log.controller";

const router = express.Router()

router.post("/", protect, createWorkout)
router.get("/", protect, getWorkouts)
router.put("/:id", protect, updateWorkout)
router.delete("/:id", protect, deleteWorkout)

router.post("/log/:workoutId", protect, createNewWorkoutLog)
export default router