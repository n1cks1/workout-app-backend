


// @desc    Update exercise time
// @route   PUT /api/exercises/log/time/:id
// @access  Private
import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";
import exerciseRoutes from "../exercise.routes";

export const updateExerciseLogTime = expressAsyncHandler( async (req: Request, res: Response) => {
    const { weight, repeat, isCompleted } = req.body

    try {
        const exerciseLogTime = await prisma.exerciseTime.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                weight, repeat, isCompleted
            }
        })

        res.json(exerciseLogTime)
    } catch (error) {
        res.status(404)
        throw new Error("Exercise Time not found")
    }
})


// @desc    Update status of complete exercise log
// @route   PATCH /api/exercises/log/complete/:id
// @access  Private
export const completeExerciseLog = expressAsyncHandler( async (req: Request, res: Response) => {
    const { isCompleted } = req.body


    try {
        const exerciseLog = await prisma.exerciseLog.update({
            where: {
                id: Number(req.params.logId)
            },
            data: {
                isCompleted
            },
            include: {
                exercise: true,
                workoutLog: true
            }
        })

        res.json(exerciseLog)
    } catch (error) {
        res.status(404)
        throw new Error("Exercise Log not found")
    }
})
