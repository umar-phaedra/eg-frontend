import { IUser } from "./auth-context-types";

export namespace ApiTypes {

    export interface Signup {
        name: string;
        email: string;
        password: string;
    }

    export interface Login {
        email: string;
        password: string;
    }

    export interface AuthResponse {
        access_token: string;
        user: IUser
    }
}
