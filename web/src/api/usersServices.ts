import Axios from "axios";

function login(param: LoginParams): Promise<UserAccountDto> {
  return Axios.request({
    url: "/api/users/login",
    method: "POST",
    params: param,
  }).then((data) => data.data);
}

function logout() {
  return Axios.request({
    url: "/api/users/logout",
    method: "GET",
  }).then((data) => data.data);
}

function getCurrentUser(): Promise<UserAccountDto> {
  return Axios.request({
    url: "/api/users/currentUser",
    method: "GET",
  }).then((data) => data.data);
}

export const usersServices = {
  login,
  logout,
  getCurrentUser,
};

export interface LoginParams {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface UserAccountDto {
  id: number;
  nick: string;
}
