import { Item, PlanerItems, Room } from "../PlanerTypes";
import axios from "axios";
function save(data: PlanerItemsParams) {
  return axios
    .post<PlanerItems>("/Planer/Save", data)
    .then((data) => data.data);
}

export const planerService = {
  save,
};

export interface PlanerItemsParams {
  objects: Item[];
  room?: Room;
}
