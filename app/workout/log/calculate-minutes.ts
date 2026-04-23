import type {Workout} from "../../../generated/prisma/client";

export const calculateMinutes = (length: number): number => {
    return Math.ceil(length * 3.7);
}