import { Item, PlanerItems, Room } from "../Planer/PlanerTypes";

export interface PlanerItemsParams {
  objects: Item[];
  room?: Room;
  name: string;
}

export interface PlanerItemsDto extends PlanerItems {
  objects: Item[];
  room?: Room;
  name: string;
  id: number;
}
