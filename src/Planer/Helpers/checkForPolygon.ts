import { ClickPoints, Item } from "../PlanerTypes"
import { cloneObject } from "./cloneObject";

interface WallsIntersectPoint{
id:number,
intersectPoints: IntersectPoint[]
    
}
interface IntersectPoint{
    id:number,
        x:number,
        y:number
}

export default function checkForPolygon(items:Item[]){
    let planerItems:Item[] = cloneObject(items);

    let allIntersectPoints = getAllIntersectPoints(planerItems);

    let vertices = checkIfpointsCreatePolygon(allIntersectPoints);
    return vertices.length > 0? vertices: false;
}


function intersect(firstLine:ClickPoints, secondLine:ClickPoints) {
    const [x1,y1,x2,y2] = mapToCordinates(firstLine);
    const [x3,y3,x4,y4] = mapToCordinates(secondLine);

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
        return false
    }

    let denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    if (denominator === 0) {
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return false
    }
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return {x, y}
}


function mapToCordinates(item:ClickPoints)
{
    let x1 = item.start.x;
    let y1 = item.start.y;
    let x2 = item.end.x;
    let y2 = item.end.y; 

    return [x1,y1,x2,y2];
}


function getAllIntersectPoints(planerItems:Item[]){
    let wallsIntersectPoints = [];
    let walls = planerItems.filter(item => item.type==="Wall");
    for(let x = 0; x <walls.length; x++)
    {
        let intersectPoints = []
        if(walls.length > 1)
        {
            let firstLine = {start:walls[x].position.start!, end:walls[x].position.end!}
            for(let y = 0; y< walls.length ;y++){
                if(x!==y){
                let secondLine = {start:walls[y].position.start!, end:walls[y].position.end!}

                let intersectPoint = intersect(firstLine,secondLine);
                if(intersectPoint)
                {
                   intersectPoints.push({
                       ...intersectPoint,
                       id: walls[y].id,
                   })
                }
            }
            }
            if(intersectPoints.length > 0)
            wallsIntersectPoints.push({
                id:walls[x].id,
                intersectPoints,
            });
        }
    }
    return wallsIntersectPoints;
}


function checkIfpointsCreatePolygon(intersectPoints:WallsIntersectPoint[]){
    let prevId = 0;
    let end:any = [];
    for(let x = 0; x<intersectPoints.length; x++)
    {
        
       if(intersectPoints[x].intersectPoints.length > 1)
       {
        prevId = intersectPoints[x].id;
        end = [];
        let roomFound = p1(prevId,prevId,intersectPoints[x],intersectPoints,end);
        if(roomFound)
        {
            break;
        }
       }
    }
    let vertices:any = []
    end.forEach((item: any) =>{
        vertices.push({x:item["x"], y:item["y"]});
    });
    return vertices;

}

function p1(mainId:number, prevId:number, item:WallsIntersectPoint, allPoints: WallsIntersectPoint[], end:any):any{
    if(item.intersectPoints.length >1){
        // console.log("currentId "+ item.id)
        // console.log("prevId "+ prevId);
        // console.log("mainId "+ mainId);

        for(let y = 0; y<item.intersectPoints.length; y++)
        {
        
            let newItem = allPoints.find(p => p.id === item.intersectPoints[y].id && item.intersectPoints[y].id !== prevId);
                if(newItem?.id === mainId){
                    end.push(item.intersectPoints[y]);
                    return true;
                } 
                if(newItem?.intersectPoints.length! > 1 && newItem && newItem.intersectPoints && newItem.intersectPoints.length && newItem?.id !== mainId)
                {
                    end.push(item.intersectPoints[y]);
                    return p1(mainId,item.id,newItem,allPoints,end);
                }
        }
    }
    else{

        return;
    }
}
