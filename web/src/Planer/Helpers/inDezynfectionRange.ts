import { itemsCatalogueItems } from "../ItemsCatalogue/ItemsCatalogueList";
import { Item } from "../PlanerTypes";

export function inDezynfectionRange(object:Item, lamps: Item[]) : boolean
{
    let inRange = false;

    lamps.forEach(lamp => {
        let angle = itemsCatalogueItems.find(item => item.displayName === lamp.type)?.angle;
        if(angle){
        let ratio = Math.tan(angle*Math.PI/180);
        let radius = ratio * (lamp.height - object.height)
        let distance = Math.sqrt(Math.pow(object.position.start?.x! - lamp.position.start?.x!,2) + Math.pow(object.position.start?.y! - lamp.position.start?.y!,2));
        if(distance < radius)
        {
            inRange = true;
        }
        }

    })

    return inRange

}