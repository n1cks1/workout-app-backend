export interface IUserFields {
    id: number,
    email: string,
    name: string,
    createdAt: Date,
    updatedAt: Date,
    images: string[],
}

export const userFields =  {
    id: true,
    email: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    images: true,
}