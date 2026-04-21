import expressAsyncHandler from "express-async-handler";
import type {Request, Response, NextFunction} from 'express';
import jwt from "jsonwebtoken";
import {prisma} from "../prisma";
import {userFields} from "../utils/user.utils";
import type { IUserFields } from "../utils/user.utils";

interface JwtPayload {
    userId: number;
    iat?: number;
    exp?: number;
}

export interface reqUser extends Request{
    user: IUserFields
}

export const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401)
        throw new Error("Not authorized, no token")
    }

    const token = authHeader.split(" ")[1]

    if (!token) {
        res.status(401)
        throw new Error("No token provided")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

    const user = await prisma.user.findUnique({
        where: {
            id: decoded.userId
        },
        select: userFields
    })

    if (!user) {
        res.status(401)
        throw new Error("Not authorized")
    }

    (req as reqUser).user = user
    next()
})