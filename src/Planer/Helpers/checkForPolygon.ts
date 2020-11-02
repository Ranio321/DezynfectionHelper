import { ClickPoints, Item } from "../PlanerTypes"
import { cloneObject } from "./cloneObject";

interface WallsIntersectPoint{
id:number,
intersectPoints: IntersectPoint
    
}
interface IntersectPoint{
    id:number,
    intersectPoint:{
        x:number,
        y:number
    }
}

export default function checkForPolygon(items:Item[]){
    let planerItems:Item[] = cloneObject(items);

    let allIntersectPoints = getAllIntersectPoints(planerItems);

    let vertices = []
    if(pointsCreateShape(allIntersectPoints)){
        for(let x = 0; x< allIntersectPoints.length; x++)
        {
            vertices.push(allIntersectPoints[x].intersectPoints[0]);
        }
        vertices = getDistinctIntersectPoints(allIntersectPoints);
    }

    return vertices.length > 2 ? vertices: false;

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
    //let y = 1;
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
                       intersectPoint,
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
       // y = x+2;
    }
    return wallsIntersectPoints;
}

function pointsCreateShape(wallsIntersectPoints:any){

    let createdShape = true
    if(3 > wallsIntersectPoints.length)
    {
        createdShape = false;
    }
    for(let x = 0; x<wallsIntersectPoints.length; x++)
    {
        if(wallsIntersectPoints[x].intersectPoints < 2)
        {
            createdShape = false
        }
    }

    return createdShape;
}


function getDistinctIntersectPoints(wallsIntersectPoints:any)
{
    let intersectPoints:any[] = []
    for(let x = 0; x< wallsIntersectPoints.length; x++)
    {
        for(let y = 0; y < wallsIntersectPoints[x].intersectPoints.length; y++)
        {
        if(intersectPoints.filter(item => {
            return item.x===wallsIntersectPoints[x].intersectPoints[y].intersectPoint.x && item.y===wallsIntersectPoints[x].intersectPoints[y].intersectPoint.y}
            ).length === 0)
        {
            intersectPoints.push(wallsIntersectPoints[x].intersectPoints[y].intersectPoint)
        }
        
        }
    }
 return intersectPoints;
}