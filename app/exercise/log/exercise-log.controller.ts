import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";
import type {reqUser} from "../../../middleware/auth.middleware";

interface ITimes {
    weight: number,
    repeat: number
}

// @desc   Create new log
// @route  POST /api/exercise/:exerciseId
// @access Private
export const createNewExerciseLog = expressAsyncHandler(async (req: Request, res: Response) => {
    const exerciseId = Number(req.params.exerciseId)

    const exercise = await prisma.exercise.findUnique({
        where: {
            id: exerciseId
        }
    })

    if(!exercise) {
        res.status(404)
        throw new Error("Exercise Not Found!")
    }

    let timesDefault: ITimes[] = []

    for (let i = 0; i < exercise.times; i++) {
        timesDefault.push({
            weight: 0,
            repeat: 0
        })
    }

    const exerciseLog = await prisma.exerciseLog.create({
        data: {
            user: {
                connect: {
                    id: (req as reqUser).user.id
                }
            },
            exercise: {
                connect: {
                    id: exerciseId
                }
            },
            times: {
                createMany: {
                    data: timesDefault
                }
            }
        },
        include: {
            times: true,
        }
    })

    res.json(exerciseLog)
})


