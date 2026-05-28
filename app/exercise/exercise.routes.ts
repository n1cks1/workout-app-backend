import express from 'express'
import { protect } from '../middleware/auth.middleware'
import {
	createExercise,
	deleteExercise,
	getExercises,
	getSingleExercise,
	updateExercise
} from './exercise.controller'
import { createNewExerciseLog } from './log/exercise-log.controller'
import { getExerciseLog } from './log/get-exercise-log.controller'
import {
	completeExerciseLog,
	updateExerciseLogTime
} from './log/update-exercise-log.controller'

const router = express.Router()

/**
 * @openapi
 * /api/exercises:
 *   post:
 *     summary: Create new exercise
 *     description: Create a new exercise item
 *     tags:
 *       - Exercises
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - times
 *             properties:
 *               name:
 *                 type: string
 *                 example: Push Ups
 *               times:
 *                 type: number
 *                 example: 10
 *               iconPath:
 *                 type: string
 *                 example: /icons/pushups.png
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 times:
 *                   type: number
 *                 iconPath:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 */
router.post('/', protect, createExercise)

/**
 * @openapi
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     description: Returns list of all exercises ordered by newest first
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: List of exercises
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
 *                   times:
 *                     type: number
 *                   iconPath:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', protect, getExercises)

/**
 * @openapi
 * /api/exercises/{id}:
 *   put:
 *     summary: Update exercise
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Push Ups
 *               times:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *       400:
 *         description: Invalid exercise id
 *       404:
 *         description: Exercise not found
 */
router.put('/:id', protect, updateExercise)

/**
 * @openapi
 * /api/exercises/{id}:
 *   get:
 *     summary: Get single exercise
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: Exercise found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 name:
 *                   type: string
 *                 times:
 *                   type: number
 *                 iconPath:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Exercise not found
 */
router.get('/:id', protect, getSingleExercise)

/**
 * @openapi
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete exercise
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: Exercise deleted successfully
 *       400:
 *         description: Invalid exercise id
 *       404:
 *         description: Exercise not found
 */
router.delete('/:id', protect, deleteExercise)

/**
 * @openapi
 * /api/exercise/{exerciseId}:
 *   post:
 *     summary: Create new exercise log
 *     description: Creates a new exercise log with default times based on exercise configuration
 *     tags:
 *       - Exercise Logs
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise ID
 *     responses:
 *       200:
 *         description: Exercise log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 userId:
 *                   type: number
 *                 exerciseId:
 *                   type: number
 *                 isCompleted:
 *                   type: boolean
 *                 times:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       weight:
 *                         type: number
 *                       repeat:
 *                         type: number
 *                       isCompleted:
 *                         type: boolean
 *       404:
 *         description: Exercise not found
 */
router.post('/log/:exerciseId', protect, createNewExerciseLog)

/**
 * @openapi
 * /api/exercises/log/{logId}:
 *   get:
 *     summary: Get exercise log
 *     description: Returns exercise log with exercise details and calculated previous values
 *     tags:
 *       - Exercise Logs
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise log ID
 *     responses:
 *       200:
 *         description: Exercise log found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 exercise:
 *                   type: object
 *                 times:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       weight:
 *                         type: number
 *                       repeat:
 *                         type: number
 *                       prevWeight:
 *                         type: number
 *                       prevRepeat:
 *                         type: number
 *                 isCompleted:
 *                   type: boolean
 *       404:
 *         description: Exercise log not found
 */
router.get('/log/:logId', protect, getExerciseLog)

/**
 * @openapi
 * /api/exercises/log/time/{id}:
 *   put:
 *     summary: Update exercise log time
 *     description: Updates weight, repeat and completion status for a single exercise set
 *     tags:
 *       - Exercise Logs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise time ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *                 example: 50
 *               repeat:
 *                 type: number
 *                 example: 12
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Exercise time updated successfully
 *       404:
 *         description: Exercise time not found
 */
router.put('/log/time/:id', protect, updateExerciseLogTime)

/**
 * @openapi
 * /api/exercises/log/complete/{logId}:
 *   patch:
 *     summary: Complete exercise log
 *     description: Updates completion status of entire exercise log
 *     tags:
 *       - Exercise Logs
 *     parameters:
 *       - in: path
 *         name: logId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Exercise log ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isCompleted
 *             properties:
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Exercise log updated successfully
 *       404:
 *         description: Exercise log not found
 */
router.patch('/log/:logId', protect, completeExerciseLog)

export default router
