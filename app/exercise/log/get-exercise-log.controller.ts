import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";
import type {reqUser} from "../../middleware/auth.middleware";
import {addPrevValues, type ILog} from "./add-prev-values.util";
import exerciseRoutes from "../exercise.routes";

// @desc    Get exercise log
// @route   GET /api/exercises/log/:logId
// @access  private
export const getExerciseLog = expressAsyncHandler( async (req: Request, res: Response) => {
    const exerciseLog = await prisma.exerciseLog.findUnique({
        where: {
            id: Number(req.params.logId)
        },
        include: {
            exercise: true,
            times: {
                orderBy: {
                    id: 'asc'
                }
            }
        }
    })

    if (!exerciseLog) {
        res.status(404)
        throw new Error("ExerciseLog not found")
    }

    const prevExerciseLog = await prisma.exerciseLog.findFirst({
        where: {
            userId: (req as reqUser).user.id,
            id: exerciseLog.id,
            isCompleted: false
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            times: true
        }
    })


    res.json({
        ...exerciseLog,
        times: addPrevValues(exerciseLog, prevExerciseLog)
    })
})

