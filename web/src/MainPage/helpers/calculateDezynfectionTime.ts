import { PlanerItemsDto } from "../../api/models";
import { calculateDezynfectionRadius } from "../../Planer/Helpers/calculateDezynfectionRadius";
import { itemsCatalogueItems } from "../../Planer/ItemsCatalogue/ItemsCatalogueList";

export function calculateDezynfectionTime(objects: PlanerItemsDto): number{

    let time = getDezynfectionTime(objects);

    time = Math.ceil(time/60);

    return time
}

function getDezynfectionTime(objects: PlanerItemsDto) : number
{
    let lamps = objects.objects.filter(item => item.type.includes("Lamp"));

    let time: number[] = [] ;

        
    lamps.forEach(lamp => {
        let lampParams = itemsCatalogueItems.find(item => item.displayName === lamp.type)
        let radius = calculateDezynfectionRadius(lampParams?.angle, lamp.height);
        let area = Math.PI*Math.pow(radius/100,2);
        if (lampParams?.flux){
             time.push(25 / ((lampParams?.flux / 1000) / area));
        }
        
    })

    return time.sort((a,b) => b - a)[0];

}