import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";



// @desc    Update workout log completed
// @route   PATCH /api/workout/log/complete/:workoutLogId
// @access  Private
export const updateCompleteWorkoutLog = expressAsyncHandler (async (req: Request, res: Response) => {
    const workoutLogId = Number(req.params.workoutLogId)
    try {
        const workoutLog = await prisma.workoutLog.update({
            where: {
                id: workoutLogId
            },
            data: {
                isCompleted: true
            }
        })

        res.json(workoutLog)
    } catch (error) {
        res.status(404)
        throw new Error("Workout log not found")
    }
})

