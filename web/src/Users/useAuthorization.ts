import { useEffect, useState } from "react";
import { LoginParams, usersServices } from "../api/usersServices";
import { Authorization, User } from "./authorizationModels";

export function useAuthorization() : Authorization
{
    const [user, setUser] = useState<User>()

    function login(param: LoginParams)
    {
        return usersServices.login(param)
        .then(data => setUser({
            id: data.id,
            nick: data.nick
        })
        )
        .catch(() => setUser(undefined))
    }

    function logout(){
        console.log("dsad");
        usersServices.logout()
        .then(() => {
            setUser(undefined)
        })
        .catch(() => console.log("Logout error"));
    }

    useEffect(() => {
        usersServices.getCurrentUser()
        .then(data => setUser({
            id: data.id,
            nick: data.nick
        }))
        .catch(() => {});

    },[])
    return { user, login, logout};
}