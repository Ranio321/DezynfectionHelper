import React, { useContext } from "react";
import { Authorization } from "./authorizationModels";

export const AuthContext = React.createContext<Authorization>({
    login: () => null,
    logout: () => null
});

export const useAuth = () => {
    return useContext(AuthContext);
};

  