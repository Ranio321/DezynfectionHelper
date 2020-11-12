import { PlanerItems } from "../Planer/PlanerTypes";
import axios from "axios";
import { PlanerItemsDto, PlanerItemsParams } from "./models";

function save(data: PlanerItemsParams): Promise<PlanerItems> {
  return axios
    .post<PlanerItems>("/Planer/Save", data)
    .then((data) => data.data);
}

function get(id: number): Promise<PlanerItemsDto> {
  return axios
    .request<PlanerItemsDto>({
      url: "/Planer/Get",
      method: "get",
      params: {
        id: id,
      },
    })
    .then((data) => {
      return data.data;
    });
}

function getAll(): Promise<PlanerItemsDto[]> {
  return axios
    .get<PlanerItemsDto[]>("/Planer/GetAll")
    .then((data) => data.data);
}

export const planerService = {
  save,
  get,
  getAll,
};
