import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const generateToken = (userId: number) => {
    const secret: string = process.env.JWT_SECRET
    return jwt.sign(
        {userId},
        secret,
        { expiresIn: "10d" }
    )
}