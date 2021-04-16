import { PlanerItems } from "../planer/PlanerTypes";
import axios from "axios";
import { PlanerItemsDto, PlanerItemsParams } from "./models";

function save(data: PlanerItemsParams): Promise<PlanerItems> {
  return axios
    .post<PlanerItems>("/api/Planer/Save", data)
    .then((data) => data.data);
}

function get(id: number): Promise<PlanerItemsDto> {
  return axios
    .request<PlanerItemsDto>({
      url: "/api/Planer/Get",
      method: "get",
      params: {
        id
      },
    })
    .then((data) => {
      return data.data;
    });
}

function getAll(): Promise<PlanerItemsDto[]> {
  return axios
    .get<PlanerItemsDto[]>("/api/Planer/GetAll")
    .then((data) => data.data);
}

function deleteById(id: number): Promise<any> {
  return axios
    .request({
      url: "/api/Planer/delete",
      method: "delete",
      data:{
        id
      }
    })
    .then((data) => {
      return data.data;
    });
}

function update(data: PlanerItemsParams) {
  return axios
    .request({
      url: "/api/Planer/update",
      method: "PUT",
      data,
    })
    .then((data) => data.data);
}

export const planerService = {
  save,
  get,
  getAll,
  deleteById,
  update,
};
