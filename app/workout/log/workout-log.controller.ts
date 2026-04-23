import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../../prisma";
import type {reqUser} from "../../middleware/auth.middleware";


export const createNewWorkoutLog = expressAsyncHandler( async (req: Request, res: Response) => {
    const workoutId = Number(req.params.workoutId)

    const workout = await prisma.workout.findUnique({
        where: {
            id: workoutId
        },
        include: {
            exercises: true
        }
    })

    if (!workout) {
        res.status(404)
        throw new Error("Workout not found")
    }

    const workoutLog = await prisma.workoutLog.create({
        data: {
            user: {
                connect: {
                    id: (req as reqUser).user.id
                }
            },
            workout: {
                connect: {
                    id: workoutId
                }
            },
            exerciseLogs: {
                create: workout.exercises.map((exercise) => ({
                    user: {
                        connect: {
                            id: (req as reqUser).user.id
                        }
                    },
                    exercise: {
                        connect: {
                            id: exercise.id
                        }
                    },
                    times: {
                        create: Array.from({length: exercise.times}, () => ({
                            weight: 0,
                            repeat: 0
                        }))
                    }
                }))
            }

        },
        include: {
            exerciseLogs: {
                include: {
                    times: true
                }
            }
        }
    })

    res.json(workoutLog)
})
