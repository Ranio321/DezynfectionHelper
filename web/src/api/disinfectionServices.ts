import { BeginDezynfecetionParams } from "./models";
import axios from "axios";

function beginDisinfection(params: BeginDezynfecetionParams) {
  return axios
    .request({
      url: "/api/Disinfection/Begin",
      method: "POST",
      params,
    })
    .then((data) => data.data)
    .catch(() => {});
}

function endDisinfection(id: number) {
  return axios
    .request({
      url: "/api/Disinfection/End",
      method: "POST",
      params: {
        id: id,
      },
    })
    .then((data) => data.data)
    .catch(() => {});
}
export const disinfectionServices = {
  beginDisinfection,
  endDisinfection,
};
