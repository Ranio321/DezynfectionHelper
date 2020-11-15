import { useEffect, useState } from "react";
import { calcPolygonArea } from "../Helpers/calcPolygonArea";
import checkForPolygon from "../Helpers/checkForPolygon";
import { cloneObject } from "../Helpers/cloneObject";
import { Item, PlanerItems, Room } from "../PlanerTypes";

export function usePlaner(init?: PlanerItems) {
  const [currentStep, setCurrentStep] = useState(0);
  const [planerItems, setPlanerItems] = useState<PlanerItems[]>(() => [
    newPlanerItems,
  ]);

  function addItem(item: Item) {
    let items: PlanerItems = cloneObject(planerItems[currentStep]);
    item.height = 200;
    items.items.push({ ...item });
    setPlanerItems([...planerItems, items]);
    addToHistory();
  }

  function deleteItem(id: number) {
    let items: PlanerItems = cloneObject(planerItems[currentStep]);

    let index = items.items.findIndex((item) => item.id === id);
    items.items.splice(index, 1);

    setPlanerItems([...planerItems, items]);
    addToHistory();
  }
  function deleteAll() {
    setPlanerItems([...planerItems, newPlanerItems]);
    addToHistory();
  }

  function newCanvas() {
    setPlanerItems([{ items: [] }]);
    setCurrentStep(0);
  }
  function deleteLast() {
    let items: PlanerItems = cloneObject(planerItems[currentStep]);
    items.items.pop();
    setPlanerItems([...planerItems, items]);
    addToHistory();
  }

  function undo() {
    let items: PlanerItems[] = cloneObject(planerItems);
    items.pop();

    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setPlanerItems([...items]);
    }
  }

  function getItem(id: number | undefined): Item | undefined {
    let item;
    if (id && planerItems[currentStep]) {
      item = planerItems[currentStep].items.find((item) => item.id === id);
    }
    return item;
  }

  function changeItem(id: number, item: Item) {
    let items: PlanerItems = cloneObject(planerItems[currentStep]);

    let index = items.items.findIndex((item) => item.id === id);

    items.items[index] = item;
    setPlanerItems([...planerItems, items]);
    addToHistory();
  }

  function addToHistory() {
    if (currentStep >= 0) {
      setCurrentStep(currentStep + 1);
    }
  }

  useEffect(() => {
    let vertices = checkForPolygon(planerItems[currentStep].items);
    let room: Room[] = [];

    let items: PlanerItems[] = cloneObject(planerItems);
    if (vertices) {
      var area = calcPolygonArea(vertices);
      room.push({
        area: area,
        name: "Main Room",
        vertices: vertices,
      });
    }
    items[items.length - 1].rooms = room;
    setPlanerItems(items);
  }, [currentStep]);

  const services = {
    addItem,
    deleteItem,
    deleteAll,
    deleteLast,
    getItem,
    undo,
    newCanvas,
    changeItem,
  };

  useEffect(() => {
    if (init) {
      setPlanerItems([init]);
    }
    console.log(init);
  }, [init?.name]);

  return [planerItems[currentStep], services] as const;
}

const newPlanerItems = {
  items: [],
  rooms: [],
};
