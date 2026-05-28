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


/**
 * @openapi
 * /api/workout:
 *   post:
 *     summary: Create new workout
 *     description: Creates a workout and connects exercises by IDs
 *     tags:
 *       - Workouts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - exerciseIds
 *             properties:
 *               name:
 *                 type: string
 *                 example: Push Day
 *               exerciseIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 2, 3]
 *     responses:
 *       200:
 *         description: Workout created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 minute:
 *                   type: number
 *                   example: 45
 *                 exercises:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Exercise not found (invalid relation)
 */
router.post('/', protect, createWorkout)

/**
 * @openapi
 * /api/workout:
 *   get:
 *     summary: Get all workouts
 *     description: Returns list of all workouts with exercises and logs
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: List of workouts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   exercises:
 *                     type: array
 *                   workoutLogs:
 *                     type: array
 */
router.get('/', protect, getWorkouts)

/**
 * @openapi
 * /api/workout/{id}:
 *   get:
 *     summary: Get single workout
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 exercises:
 *                   type: array
 *                 workoutLogs:
 *                   type: array
 *       404:
 *         description: Workout not found
 */
router.get('/:id', protect, getSingleWorkout)

/**
 * @openapi
 * /api/workout/{id}:
 *   put:
 *     summary: Update workout
 *     description: Updates workout name and replaces exercises
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Leg Day
 *               exerciseIds:
 *                 type: array
 *                 items:
 *                   type: number
 *                 example: [1, 4, 5]
 *     responses:
 *       200:
 *         description: Workout updated successfully
 *       400:
 *         description: Invalid workout id
 *       404:
 *         description: Workout not found
 */
router.put('/:id', protect, updateWorkout)

/**
 * @openapi
 * /api/workout/{id}:
 *   delete:
 *     summary: Delete workout
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout deleted successfully
 *       400:
 *         description: Invalid workout id
 *       404:
 *         description: Workout not found
 */
router.delete('/:id', protect, deleteWorkout)

/**
 * @openapi
 * /api/workout/log/{workoutId}:
 *   post:
 *     summary: Create new workout log
 *     description: Creates a workout log and automatically generates exercise logs with default sets
 *     tags:
 *       - Workout Logs
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout ID
 *     responses:
 *       200:
 *         description: Workout log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 workoutId:
 *                   type: number
 *                 isCompleted:
 *                   type: boolean
 *                 exerciseLogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       exerciseId:
 *                         type: number
 *                       times:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: number
 *                             weight:
 *                               type: number
 *                             repeat:
 *                               type: number
 *       404:
 *         description: Workout not found
 */
router.post('/log/:workoutId', protect, createNewWorkoutLog)

/**
 * @openapi
 * /api/workout/log/{workoutLogId}:
 *   get:
 *     summary: Get workout log
 *     description: Returns workout log with exercises and calculated workout duration
 *     tags:
 *       - Workout Logs
 *     parameters:
 *       - in: path
 *         name: workoutLogId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout log ID
 *     responses:
 *       200:
 *         description: Workout log retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 isCompleted:
 *                   type: boolean
 *                 workout:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     exercises:
 *                       type: array
 *                 exerciseLogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       exercise:
 *                         type: object
 *                       times:
 *                         type: array
 *                 minutes:
 *                   type: number
 *                   example: 45
 *       404:
 *         description: Workout log or workout not found
 */
router.get('/log/:workoutLogId', protect, getWorkoutLog)

/**
 * @openapi
 * /api/workout/log/complete/{workoutLogId}:
 *   patch:
 *     summary: Complete workout log
 *     description: Marks workout log as completed
 *     tags:
 *       - Workout Logs
 *     parameters:
 *       - in: path
 *         name: workoutLogId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Workout log ID
 *     responses:
 *       200:
 *         description: Workout log updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 isCompleted:
 *                   type: boolean
 *       404:
 *         description: Workout log not found
 */
router.patch('/log/complete/:workoutLogId', protect, updateCompleteWorkoutLog)
export default router
