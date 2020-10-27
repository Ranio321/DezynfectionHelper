
export interface ClickPoints {
    start: Point
    end: Point
}

export interface Point extends MousePosition{
    x: number,
    y: number
}

export interface MousePosition{
    x: number,
    y: number
}

export interface Walls{
    walls: Item[]
}

export interface Wall{
    wall:Item
}

export interface DrawingLine{
    start: Point,
    end: Point
}
export interface Item
{
    id: number,
    position: LampPosition,
    height?: number
    type: string
}

export interface PlanerItems
{
    items: Items[]
}

export interface Items
{
    item: Item
}

export interface PlanerObject
{
    id: number,
    position:{}
    height?: number
    type: string
}

export interface Lamp extends PlanerObject
{
    id: number,
    position: LampPosition,
    height?: number;
    
}

export interface LampPosition 
{
    start?: Point
    end?: Point
    width?: number,
    height?: number
}