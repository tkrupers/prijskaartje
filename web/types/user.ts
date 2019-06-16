export type UserName = {
    firstName?: string;
    lastName?: string;
}

export type User = {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    name?: UserName;
    birth?: Date;
}