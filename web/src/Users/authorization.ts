import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Authorization, User } from "./authorizationModels";

export const AuthContext = React.createContext<Authorization>({
    login: () => null,
    logout: () => null
});

export const useAuth = () => {
    return useContext(AuthContext);
};

  