import expressAsyncHandler from "express-async-handler";
import type {Request, Response} from "express";
import {prisma} from "../prisma";
import {generateToken} from "../auth/generate-token";

// @desc get user Profile
// @route GET /api/user/profile
// @access Private
export const getProfile = expressAsyncHandler( async (req: Request, res: Response) => {
    res.json((req as any).user)
})