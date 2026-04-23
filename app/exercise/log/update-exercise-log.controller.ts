


// @desc    Update exercise time
// @route   PUT /api/exercises/log/time/:id
// @access  Private
import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";

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