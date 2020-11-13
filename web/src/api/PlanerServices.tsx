import { PlanerItems } from "../Planer/PlanerTypes";
import axios from "axios";
import { PlanerItemsDto, PlanerItemsParams } from "./models";

function save(data: PlanerItemsParams): Promise<PlanerItems> {
  console.log(data);
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
      console.log(data.data);
      return data.data;
    });
}

function getAll(): Promise<PlanerItemsDto[]> {
  return axios
    .get<PlanerItemsDto[]>("/Planer/GetAll")
    .then((data) => data.data);
}

function deleteById(id: number): Promise<any> {
  return axios
    .request({
      url: "/Planer/delete?id=" + id,
      method: "delete",
    })
    .then((data) => {
      return data.data;
    });
}

export const planerService = {
  save,
  get,
  getAll,
  deleteById,
};
