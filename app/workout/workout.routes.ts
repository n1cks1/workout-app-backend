import express from "express";
import {protect} from "../middleware/auth.middleware";
import {createWorkout, deleteWorkout, getWorkouts, updateWorkout} from "./workout.controller";
import {createNewWorkoutLog} from "./log/workout-log.controller";
import {getWorkoutLog} from "./log/get-workout-log.controller";
import {updateCompleteWorkoutLog} from "./log/update-workout-log.controller";

const router = express.Router()

router.post("/", protect, createWorkout)
router.get("/", protect, getWorkouts)
router.put("/:id", protect, updateWorkout)
router.delete("/:id", protect, deleteWorkout)

router.post("/log/:workoutId", protect, createNewWorkoutLog)
router.get("/log/:workoutLogId", protect, getWorkoutLog)
router.patch("/log/complete/:workoutLogId", protect, updateCompleteWorkoutLog)
export default router