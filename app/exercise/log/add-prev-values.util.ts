export interface ILog
{
    id: number,
    createdAt: Date,
    updatedAt: Date,
    isCompleted: boolean,
    userId: number | null,
    workoutLogId: number | null,
    exercise?: IExercise[]
    times?: ITime[]
}

export interface ITime {
    "id": number,
    "createdAt": Date,
    "updatedAt": Date,
    "weight": number,
    "repeat": number,
    "isCompleted": boolean,
    "exerciseLogId": number | null
}

export interface IExercise {
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    times: number;
    iconPath: string;
    exerciseLogId: number | null
}


export const addPrevValues = (log: ILog, prevLog: ILog | null = null) => {
    return log.times?.map((item, idx: number) => ({
        ...item,
        prevWeight: prevLog?.times?.[idx]?.weight ?? 0, // ?? - срабатывает только на null и undefined
        prevRepeat: prevLog?.times?.[idx]?.repeat ?? 0,
    }))
}