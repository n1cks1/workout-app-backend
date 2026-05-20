import express from 'express'
import { protect } from '../middleware/auth.middleware'
import { getWorkoutLog } from './log/get-workout-log.controller'
import { updateCompleteWorkoutLog } from './log/update-workout-log.controller'
import { createNewWorkoutLog } from './log/workout-log.controller'
import {
	createWorkout,
	deleteWorkout,
	getSingleWorkout,
	getWorkouts,
	updateWorkout
} from './workout.controller'

const router = express.Router()

router.post('/', protect, createWorkout)
router.get('/', protect, getWorkouts)
router.get('/:id', protect, getSingleWorkout)
router.put('/:id', protect, updateWorkout)
router.delete('/:id', protect, deleteWorkout)

router.post('/log/:workoutId', protect, createNewWorkoutLog)
router.get('/log/:workoutLogId', protect, getWorkoutLog)
router.patch('/log/complete/:workoutLogId', protect, updateCompleteWorkoutLog)
export default router
