import { itemList } from "../Components/Sidebar/SidebarItems/Items";
import { ClickPoints, Item, Items, Point } from "../PlanerTypes";
import { snapToGrid } from "./snapToGrid";

function getUniqueId()
{
    return Date.now();
}
function createWall(startPosition: Point, endPosition:Point): Item {

   let position = snapToGrid([startPosition.x, startPosition.y, endPosition.x, endPosition.y]);
    let newPoints: ClickPoints = {
      start: {x:position[0], y: position[1]},
      end: {x:position[2], y: position[3]},
    };

    let item: Item = {
      position: newPoints,
      id: getUniqueId(),
      type: itemList.wall,
    };

    return item;
}

function createLamp(position: Point, width:number, height:number): Item
{ 
    let item: Item = {
        position: {start:position , width, height},
        id: getUniqueId(),
        type: itemList.lamp,
      };

    return item;
}

export const itemFactory = {
    createLamp,
    createWall
}