import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../prisma";
import {generateToken} from "../auth/generate-token";
import type {reqUser} from "../middleware/auth.middleware";
import {userFields} from "../utils/user.utils";
import {calculateMinutes} from "../workout/log/calculate-minutes";

// @desc get user Profile
// @route GET /api/user/profile
// @access Private
export const getProfile = expressAsyncHandler( async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            id: (req as reqUser).user.id
        },
        select: userFields
    })

    if (!user) {
        res.status(404)
        throw new Error("No such user");
    }

    const exerciseCompleted = await prisma.exerciseLog.count({
        where: {
            isCompleted: true,
            userId: (req as reqUser).user.id
        },

    })

    const timesCompleted = await prisma.exerciseTime.aggregate({
        where: {
            isCompleted: true,
            exerciseLog: {
                userId: (req as reqUser).user.id
            }
        },
        _sum: {
            weight: true
        }
    })

    const workouts = await prisma.workoutLog.count({
        where: {
            userId: user.id,
            isCompleted: true,
        }
    })

    const totalMinutes = calculateMinutes(exerciseCompleted)

    const totalKgs: number = timesCompleted._sum.weight || 0


    res.json({
        ...user,
        statistics: [
        {
            label: "minutes",
            value: totalMinutes
        },
        {
            label: "Workouts",
            value: workouts
        },
        {
            label: "kilograms",
            value: totalKgs
        }
    ]})
})