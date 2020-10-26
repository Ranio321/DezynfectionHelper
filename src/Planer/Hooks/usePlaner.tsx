import { useEffect, useState } from "react";
import { Item, Items, Lamp, PlanerItems, Wall } from "../PlanerTypes";

export function usePlaner()
{

    const [planerItems, setPlanerItems] = useState<PlanerItems>({items:[{item:{id:5, position:{width:50, height:50}}}]})

    function addItem(item:Items)
    {
        let items: PlanerItems = {...planerItems};
        items.items.push(item);
        setPlanerItems(items);  
    }

    function deleteItem(id:number)
    {
        let items: PlanerItems = {...planerItems};
        let index = items.items.findIndex(item =>{
        return item.item.id === id
        })
        items.items.splice(index,1);
        setPlanerItems({...items});
        
    }

}