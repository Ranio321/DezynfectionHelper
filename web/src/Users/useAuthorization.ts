import { useEffect, useState } from "react";
import { LoginParams, usersServices } from "../api/usersServices";
import { Authorization, User } from "./authorizationModels";

export function useAuthorization() : Authorization
{
    const [user, setUser] = useState<User>();
    const [servicePromise, setServicePromise] = useState<Promise<any>>();

    function login(param: LoginParams)
    {
        setServicePromise(usersServices.login(param)
        .then(data => setUser({
            id: data.id,
            nick: data.nick
        })
        )
        .catch(() => setUser(undefined))
        );
    }

    function logout(){
        
        setServicePromise(usersServices.logout()
        .then(() => {
            setUser(undefined)
        })
        .catch(() => console.log("Logout error"))
        )
    }

    useEffect(() => {
        setServicePromise(usersServices.getCurrentUser()
        .then(data => setUser({
            id: data.id,
            nick: data.nick
        }))
        .catch(() => {})
        );

    },[])
    return { user, login, logout, promise: servicePromise};
}