import { BeginDezynfecetionParams } from "./models";
import axios from "axios";

function beginDezynfection(params: BeginDezynfecetionParams) {
  return axios
    .request({
      url: "/api/Dezynfection/Begin",
      method: "POST",
      params,
    })
    .then((data) => data.data)
    .catch(() => {});
}

function endDezynfection(id: number) {
  return axios
    .request({
      url: "/api/Dezynfection/End",
      method: "POST",
      params: {
        id: id,
      },
    })
    .then((data) => data.data)
    .catch(() => {});
}
export const dezynfectionServices = {
  beginDezynfection,
  endDezynfection,
};
