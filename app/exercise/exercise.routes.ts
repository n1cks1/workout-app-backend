import express from "express";
import {protect} from "../middleware/auth.middleware";
import {createExercise, deleteExercise, getExercises, updateExercise} from "./exercise.controller";
import {createNewExerciseLog} from "./log/exercise-log.controller";
import {getExerciseLog} from "./log/get-exercise-log.controller";
import {updateExerciseLogTime} from "./log/update-exercise-log.controller";

const router = express.Router()

router.post('/', protect, createExercise)
router.get('/', protect, getExercises)
router.put('/:id', protect, updateExercise)
router.delete('/:id', protect, deleteExercise)

router.post("/log/:exerciseId", protect, createNewExerciseLog)
router.get("/log/:logId", protect, getExerciseLog)
router.put("/log/time/:id", protect, updateExerciseLogTime)
export default router