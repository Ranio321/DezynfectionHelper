import { LoginParams } from "../api/usersServices";

export interface Authorization {
    login: (param: LoginParams) => any,
    logout: () => any,
    user?: User,
    promise?: Promise<any>
}

export interface User{
    id: number
    nick: string
}