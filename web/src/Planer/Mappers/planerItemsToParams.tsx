import { PlanerItemsParams } from "../api/PlanerServices";
import { PlanerItems } from "../PlanerTypes";

export function planerItemsToParams(
  planerItems: PlanerItems
): PlanerItemsParams {
  let room;
  if (planerItems?.rooms?.length! > 0) {
    room = planerItems.rooms![0];
  }
  let items: PlanerItemsParams = {
    objects: planerItems.items,
    room: room,
  };
  return items;
}
