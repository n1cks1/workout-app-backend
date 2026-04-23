import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";
import {calculateMinutes} from "./calculate-minutes";



// @desc    Get workout log
// @route   GET /api/workout/log/:workoutLogId
// @access  Private
export const getWorkoutLog = expressAsyncHandler( async (req: Request, res: Response) => {
    const workoutLog = await prisma.workoutLog.findUnique({
        where: {
            id: Number(req.params.workoutLogId)
        },
        include: {
            workout: {
                include: {
                    exercises: true
                }
            },
            exerciseLogs: {
                orderBy: {
                    id: 'asc'
                },
                include: {
                    exercise: true
                }
            }
        }
    })

    if (!workoutLog) {
        res.status(404)
        throw new Error("Workout log not found")
    }

    if (!workoutLog.workout) {
        res.status(404)
        throw new Error("Workout not found")
    }

    res.json({...workoutLog,
        minutes: calculateMinutes(workoutLog.workout.exercises.length)
    })

})