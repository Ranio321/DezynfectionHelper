import { useEffect, useState } from "react";
import { cloneObject } from "../Helpers/cloneObject";
import { Item, PlanerItems } from "../PlanerTypes";

export function usePlaner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [planerItems, setPlanerItems] = useState<PlanerItems[]>([
    {
      items: [],
    },
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
    let index = items.items.findIndex((item) => {
      return item.id === id;
    });
    items.items.splice(index, 1);
    setPlanerItems([...planerItems, items]);
    addToHistory();
  }
  function deleteAll() {
    setPlanerItems([...planerItems, { items: [] }]);
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
      item = planerItems[currentStep].items.find((item) => {
        return item.id === id;
      });
    }
    return item;
  }

  function addToHistory() {
    if (currentStep >= 0) {
      setCurrentStep(currentStep + 1);
    }
  }

  const services = {
    addItem,
    deleteItem,
    deleteAll,
    deleteLast,
    getItem,
    undo,
    newCanvas,
  };

  return [planerItems[currentStep], services] as const;
}
