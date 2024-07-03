export interface IAuthContextProps {
    token: string | null;
    login: (token: string | null, user: IUser) => void;
    clearToken: () => void;
    user: IUser | null;
}

export interface IUser {
    name: string;
    email: string
}
