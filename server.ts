import express from "express";
import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import morgan from 'morgan';
import {prisma} from "./app/prisma.js";
import {errorHandler, notFound} from "./middleware/error.middleware";
import exerciseRoutes from "./app/exercise/exercise.routes";
import path from 'path'
import workoutRoutes from "./app/workout/workout.routes";

const app = express()
const PORT = +(process.env.PORT || 3000)

async function main(): Promise<void> {
    if (process.env.NODE_ENV === "development") {
        app.use(morgan('dev'))
    }
    app.use(express.json())


    const __dirname = path.resolve()
    app.use('/exercises', express.static(path.join(__dirname, "/exercises/")));


    app.use('/api/auth', authRoutes)
    app.use('/api/users', userRoutes)
    app.use('/api/exercises', exerciseRoutes)
    app.use('/api/workout', workoutRoutes)

    app.use(notFound)
    app.use(errorHandler)

    prisma.$connect()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

main().then(async () => {
    await prisma.$disconnect()
})
.catch(async (e: unknown) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})