import { useState } from "react";
import { cloneObject } from "../Helpers/cloneObject";
import { Item, Items, PlanerItems } from "../PlanerTypes";

export function usePlaner() {
  const [planerItems, setPlanerItems] = useState<PlanerItems>({
    items: [
      {
        item: {
          id: 5,
          type: "Wall",
          position: { start: { x: 250, y: 400 }, end: { x: 543, y: 234 } },
        },
      },
    ],
  });

  function addItem(item: Items) {
    let items: PlanerItems = cloneObject(planerItems);
    items.items.push({ ...item });
    setPlanerItems({ ...items });
  }

  function deleteItem(id: number) {
    let items: PlanerItems = cloneObject(planerItems);
    let index = items.items.findIndex((item) => {
      return item.item.id === id;
    });
    items.items.splice(index, 1);
    setPlanerItems({ ...items });
  }
  function deleteAll() {
    setPlanerItems({ items: [] });
  }
  function deleteLast() {
    let items: PlanerItems = cloneObject(planerItems);
    items.items.pop();
    setPlanerItems({ ...items });
  }
  function getItem(id: number | undefined): Item | undefined {
    let item;
    if (id) {
      item = planerItems.items.find((item) => {
        return item.item.id === id;
      });
    }
    return item?.item;
  }

  const services = {
    addItem,
    deleteItem,
    deleteAll,
    deleteLast,
    getItem,
  };

  return [planerItems, services] as const;
}
