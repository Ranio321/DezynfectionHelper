import axios from "axios";
import { PlanerItemsDto, PlanerItemsParams } from "./models";

function save(data: PlanerItemsParams): Promise<any> {
  return axios
    .post("/api/Planer", data)
    .then((data) => data.data);
}

function get(id: number): Promise<PlanerItemsDto> {
  return axios
    .request<PlanerItemsDto>({
      url: "/api/Planer/" + id,
      method: "get",
    })
    .then((data) => {
      return data.data;
    });
}

function getAll(): Promise<PlanerItemsDto[]> {
  return axios
    .get<PlanerItemsDto[]>("/api/Planer/All")
    .then((data) => data.data);
}

function deleteById(id: number): Promise<any> {
  return axios
    .request({
      url: "/api/Planer/" + id,
      method: "delete",
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
