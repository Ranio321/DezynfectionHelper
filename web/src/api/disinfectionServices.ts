import { BeginDezynfecetionParams } from "./models";
import axios from "axios";

function beginDisinfection(data: BeginDezynfecetionParams) {
  return axios
    .request({
      url: "/api/Disinfection/Begin",
      method: "POST",
      data
    })
    .then((data) => data.data)
    .catch(() => {});
}

function endDisinfection(data: {id:number}) {
  return axios
    .request({
      url: "/api/Disinfection/End",
      method: "POST",
      data
    })
    .then((data) => data.data)
    .catch(() => {});
}
export const disinfectionServices = {
  beginDisinfection,
  endDisinfection,
};
