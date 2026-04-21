import { type Request, type Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { prisma } from '../prisma.js'
import {hash} from "argon2";
import { faker } from '@faker-js/faker';
import {userFields} from "../utils/user.utils";
import {generateToken} from "./generate-token";
import {verify} from "argon2";

// @desc Auth user
// route POST /api/auth/login
// @access Public
export const loginUser = expressAsyncHandler(
	async (req: Request, res: Response) => {
		const {email, password} = req.body

		if (!email || !password) {
			res.status(400)
			throw new Error("Invalid email or password");
		}

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (!user) {
			res.status(401)
			throw new Error("Invalid email or password");

		}

		const verifyPassword: boolean = await verify(user.password, password)

		if (!verifyPassword) {
			res.status(401)
			throw new Error("Invalid email or password");
		}

		const token = generateToken(user.id)

		const safeUser = {
			"id": user.id,
			"email": user.email,
			"createdAt": user.createdAt,
			"updatedAt": user.updatedAt,
			"name": user.name,
			"images": user.images,
		}

		res.json({token,
			user: safeUser
		})
	}
)

// @desc Register user
// route POST /api/auth/register
// @access Public
export const registerUser = expressAsyncHandler(
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		const isUserExist = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if (isUserExist) {
			res.status(400)
			throw new Error('User already exist')
		}

		const hashedPassword = await hash(password)

		const user = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
                name: faker.person.fullName()
			},
			select: userFields

		})

		const token = generateToken(user.id)

		res.json({token, user: user})
	}
)
