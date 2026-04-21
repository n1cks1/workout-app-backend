import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../prisma";
import {Prisma} from "../../generated/prisma/client";


// @desc   Create new exercise
// @route  POST /api/exercises
// @access Private
export const createExercise = expressAsyncHandler(async (req: Request, res: Response) => {
    const {name, times, iconPath} = req.body;

    const exercise = await prisma.exercise.create({
        data: {
            name,
            times,
            iconPath
        }
    })

    res.status(201).json(exercise)
})


// @desc   Get all exercises
// @route  GET /api/exercises
// @access Private
export const getExercises = expressAsyncHandler( async (req: Request, res: Response) => {
    const exercise = await prisma.exercise.findMany({
        orderBy: {createdAt: 'desc'}
    })

    res.json(exercise)
})



// @desc   Update exercise
// @route  PUT /api/exercises/:id
// @access Private
export const updateExercise = expressAsyncHandler( async (req: Request, res: Response) => {
    const {name, times} = req.body
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400)
        throw new Error("Invalid exercise id")
    }

    try {
        const updateExercise = await prisma.exercise.update({
            where: {id},
            data: {
                name: name,
                times: times
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



// @desc   Delete exercise
// @route  DELETE /api/exercises/:id
// @access Private
export const deleteExercise = expressAsyncHandler( async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
        res.status(400)
        throw new Error("Invalid exercise id")
    }

    try {
        const deleteExercise = await prisma.exercise.delete({
            where: {id}
        })

        res.status(200).json(deleteExercise)
    } catch(error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            res.status(404)
            throw new Error("Exercise Not Found")
        }

        throw error
    }

})
