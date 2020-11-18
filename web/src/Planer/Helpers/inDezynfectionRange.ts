import { itemsCatalogueItems } from "../ItemsCatalogue/ItemsCatalogueList";
import { ClickPoints, Item } from "../PlanerTypes";
import { intersect } from "./checkForPolygon";

export function inDezynfectionRange(
  object: Item,
  lamps: Item[],
  walls: Item[]
): boolean {
  let inRange = false;

  lamps.forEach((lamp) => {
    let angle = itemsCatalogueItems.find(
      (item) => item.displayName === lamp.type
    )?.angle;
    if (angle) {
      let ratio = Math.tan((angle * Math.PI) / 180);
      let radius = ratio * (lamp.height - object.height);
      let distance = Math.sqrt(
        Math.pow(object.position.start?.x! - lamp.position.start?.x!, 2) +
          Math.pow(object.position.start?.y! - lamp.position.start?.y!, 2)
      );
        let noWallsInBetween = checkIfNoWallsInbetween(lamp,object,walls);
      if (distance < radius && noWallsInBetween) {
        inRange = true;
      }
    }
  });

  return inRange;
}

function checkIfNoWallsInbetween(
  lamp: Item,
  object: Item,
  walls: Item[]
): boolean {
  let objectLampLine: ClickPoints = {
    start: { x: object.position.start?.x!, y: object.position.start?.y! },
    end: { x: lamp.position.start?.x!, y: lamp.position.start?.y! },
  };
  let result = true;

  walls.forEach((wall) => {
    if (wall.position.start && wall.position.end) {
      let intersectPoints = intersect(objectLampLine, {
        start: wall.position.start,
        end: wall.position.end,
      });
      if (intersectPoints) {
        result = false;
      }
    }
  });
  return result;
}
