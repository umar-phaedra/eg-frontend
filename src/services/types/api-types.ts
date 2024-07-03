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
}
