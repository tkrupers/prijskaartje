export type UserName = {
    firstName?: string;
    lastName?: string;
};

export type EmailPreferences = {
    promotions: boolean;
    news: boolean;
};

export type User = {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    active: boolean;
    name?: UserName;
    birth?: string;
    emailPreferences: EmailPreferences;
};
