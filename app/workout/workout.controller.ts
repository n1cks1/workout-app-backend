import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../prisma";
import {Prisma} from "../../generated/prisma/client";


// @desc   Create new workout
// @route  POST /api/workout
// @access Private
export const createWorkout = expressAsyncHandler(async (req: Request, res: Response) => {
    const {name, exerciseIds} = req.body;

    const workout = await prisma.workout.create({
        data: {
            name,
            exercises: {
                connect: exerciseIds.map((id: number) => ({id}))
            }
        },
        include: {
            exercises: true
        }
    })

    res.status(201).json(workout)
})

// @desc   Get all exercises
// @route  GET /api/exercises
// @access Private
export const getWorkouts = expressAsyncHandler( async (req: Request, res: Response) => {
    const workout = await prisma.workout.findMany({
        orderBy: {createdAt: 'desc'},
        include: {
            exercises: true
        }
    })



    res.json(workout)
})



// @desc   Update workout
// @route  PUT /api/workout/:id
// @access Private
export const updateWorkout = expressAsyncHandler( async (req: Request, res: Response) => {
    const {name, exerciseIds} = req.body
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400)
        throw new Error("Invalid exercise id")
    }

    try {
        const updateExercise = await prisma.workout.update({
            where: {id},
            data: {
                name,
                exercises: {
                    set: exerciseIds.map((id: number) => ({id}))
                }
            },
            include: {
                exercises: true
            }
        })

        res.status(200).json(updateExercise)
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404)
            throw new Error("Exercise Not Found")
        }

        throw error
    }


})



// @desc   Delete workout
// @route  DELETE /api/delete/:id
// @access Private
export const deleteWorkout = expressAsyncHandler( async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400)
        throw new Error("Invalid exercise id")
    }

    try {
        const deleteWorkout = await prisma.workout.delete({
            where: {id}
        })

        res.status(200).json(deleteWorkout)
    } catch(error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404)
            throw new Error("Exercise Not Found")
        }

        throw error
    }

})
